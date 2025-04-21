from gensim.models import KeyedVectors  # Import KeyedVectors for loading the Word2Vec model

# Load pretrained Word2Vec binary model
# This model converts words into their corresponding vector representations.
model = KeyedVectors.load_word2vec_format("word2vec.bin", binary=True)

# # check if important words exist in the Word2Vec model
# test_words = ["shelter", "food", "water"]
# for word in test_words:
#     if word in model:
#         print(f"{word}: Found vector!")
#     else:
#         print(f"{word}: Not found in vocab.")

import numpy as np 
from pymongo import MongoClient  
import sys, json 

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["climateShield"]
collection = db["posts"]

# Fetch all posts with embedded vectors stored in the database
# Replace the hardcoded POSTS list with dynamic loading from MongoDB.
POSTS = []
for post in collection.find({"vector": {"$exists": True}}):
    POSTS.append({
        "_id": str(post["_id"]),
        "title": post.get("title", ""),
        "content": post.get("content", ""),
        "vector": np.array(post["vector"])
    })

# Splits the sentence into words, retrieves their vectors, and computes the mean vector.
def get_avg_vector(sentence):
    words = sentence.lower().split()
    vectors = [model[w] for w in words if w in model]
    return np.mean(vectors, axis=0) if vectors else None

# Measures the cosine of the angle between two vectors to determine similarity.
def cosine(a, b):
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

# Main execution block
# Processes a query from the command line, computes its vector, and finds the top 3 similar posts.
if __name__ == "__main__":
    # Receive the query string from command line arguments
    query = sys.argv[1]
    query_vec = get_avg_vector(query)
    np.save("temp_query_vector.npy", query_vec)

    # Output an empty JSON array and exit if the query vector is not computable.
    if query_vec is None:
        print(json.dumps([]))
        sys.exit()

    # Calculate cosine similarity for each post in the database
    results = []
    for post in POSTS:
        sim = cosine(query_vec, post["vector"])
        results.append((sim, post))

    # Sort posts by similarity in descending order and select the top 3 matches.
    results.sort(reverse=True)
    top_posts = [item[1] for item in results[:3]]

    # Output the top posts as a JSON formatted string.
    print(json.dumps(top_posts))