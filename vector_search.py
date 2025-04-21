import sys
import json
import numpy as np
from gensim.models import KeyedVectors

# ✅ 加载模型
model = KeyedVectors.load_word2vec_format("word2vec.bin", binary=True)

# ✅ 计算平均词向量
def get_avg_vector(sentence):
    words = sentence.lower().split()
    vectors = [model[w] for w in words if w in model]
    return np.mean(vectors, axis=0) if vectors else None

# ✅ 主函数
if __name__ == "__main__":
    query = sys.argv[1]
    print(f"[Python] 输入词: {query}", file=sys.stderr)

    vec = get_avg_vector(query)

    if vec is None:
        print("[Python] 没有找到任何词向量，返回空数组", file=sys.stderr)
        print(json.dumps([]))
        sys.exit(0)

    print(f"[Python] 向量维度: {vec.shape}", file=sys.stderr)
    print(json.dumps(vec.tolist()))