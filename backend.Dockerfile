FROM node:16

WORKDIR /app

# 复制项目文件
COPY package*.json ./
COPY server.js ./
COPY vector_search.py ./
COPY generate_vectors.py ./
COPY models/ ./models/
COPY word2vec.bin ./
COPY scripts/ ./scripts/
COPY data.js ./

# 安装依赖
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip3 install --upgrade pip
RUN pip3 install numpy==1.21.6 gensim==4.2.0 pymongo

# 安装Node依赖
RUN npm install

# 暴露端口
EXPOSE 12000

# 启动命令
CMD ["sh", "-c", "node scripts/seed.js; python3 generate_vectors.py; node server.js"] 