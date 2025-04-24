import sys
import json
import numpy as np
from gensim.models import KeyedVectors
from pymongo import MongoClient

# ✅ 加载模型
model = KeyedVectors.load_word2vec_format("word2vec.bin", binary=True)

# ✅ 计算平均词向量
def get_avg_vector(sentence):
    words = sentence.lower().split()
    vectors = [model[w] for w in words if w in model]
    if not vectors:
        return None
    return np.mean(vectors, axis=0)

# ✅ 获取查询向量
query = sys.argv[1] if len(sys.argv) > 1 else ""
query_vector = get_avg_vector(query)

if query_vector is not None:
    print(json.dumps({"vector": query_vector.tolist()}))
else:
    print(json.dumps({"error": "无法生成词向量"}))