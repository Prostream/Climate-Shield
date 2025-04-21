import sys
import json
import numpy as np
from gensim.models import KeyedVectors
from pymongo import MongoClient

# ✅ 加载 Word2Vec 模型
print("[加载模型中...]")
model = KeyedVectors.load_word2vec_format("word2vec.bin", binary=True)
print("[模型加载成功]")

# ✅ 连接 MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["climateShield"]
post_collection = db["posts"]
vector_collection = db["post_vectors"]

# ✅ 可选：清空旧的向量记录
vector_collection.delete_many({})
print("[已清空旧向量集合]")

# ✅ 遍历所有帖子
count = 0
for post in post_collection.find():
    content = post.get("content", "")
    tags = post.get("tags", []) or []

    # ✅ 合并 content + tags，并分词
    combined = content + " " + " ".join(tags)
    words = combined.lower().split()
    vectors = [model[w] for w in words if w in model]

    if not vectors:
        print(f"[跳过] post_id={post['_id']} 无有效词")
        continue

    # ✅ 计算平均向量
    avg_vec = np.mean(vectors, axis=0)

    # ✅ 写入 post_vectors 集合
    vector_doc = {
        "postId": post["_id"],
        "vector": avg_vec.tolist()
    }
    vector_collection.insert_one(vector_doc)
    count += 1

print(f"[完成] 共写入 {count} 条向量")