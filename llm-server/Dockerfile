# CUDA 11.8 + cuDNN8 + Python3.10 + torch==2.2.2  都在里面了
FROM pytorch/pytorch:2.2.2-cuda11.8-cudnn8-runtime

# 关闭字节码写入，方便读日志；取消缓冲
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# 安装其余依赖
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 拷贝代码
COPY . .

EXPOSE 8000
CMD ["uvicorn", "llm_server:app", "--host", "0.0.0.0", "--port", "8000"]
