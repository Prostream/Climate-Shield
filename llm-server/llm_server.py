"""
llm_server.py
-------------
一个最小可用的 FastAPI + Transformers 推理服务示例。

运行（本地或 Docker 容器内）：
    uvicorn llm_server:app --host 0.0.0.0 --port 8000
"""

from fastapi import FastAPI
from fastapi.concurrency import run_in_threadpool
from pydantic import BaseModel

from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    pipeline,
)

import torch

# ---------------------- 配置区域 ----------------------
MODEL_NAME = "microsoft/phi-1_5"      # 体积较小、无需申请许可；按需替换
MAX_NEW_TOKENS = 128                  # 每次响应最多生成多少 token
DEVICE_MAP = "auto"                   # 自动把模型放到 CPU / GPU
DTYPE = torch.bfloat16 if torch.cuda.is_available() else torch.float32
# -----------------------------------------------------

print(f"Loading model [{MODEL_NAME}] …")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    device_map=DEVICE_MAP,
    torch_dtype=DTYPE,
    trust_remote_code=True,
)
generator = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=MAX_NEW_TOKENS,
    device_map=DEVICE_MAP,
)

app = FastAPI(title="LLM Server", version="1.0")


class ChatRequest(BaseModel):
    prompt: str
    max_new_tokens: int | None = None  # 可选：覆盖默认生成长度


@app.get("/")
def root():
    """健康检查 / 欢迎页"""
    return {"status": "ok", "model": MODEL_NAME}


@app.post("/chat")
async def chat(req: ChatRequest):
    """主聊天接口（异步 + 线程池推理）"""
    max_tokens = req.max_new_tokens or MAX_NEW_TOKENS

    def _infer():
        output = generator(
            req.prompt,
            max_new_tokens=max_tokens,
            do_sample=True,
            temperature=0.8,
        )[0]["generated_text"]
        # 仅返回新增部分
        return output[len(req.prompt):]

    response_text = await run_in_threadpool(_infer)
    return {"response": response_text}
