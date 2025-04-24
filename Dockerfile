FROM python:3.9-slim

WORKDIR /app

# 安装 Node.js
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 安装 Python 依赖
RUN pip3 install --no-cache-dir scipy==1.10.1 numpy==1.24.3 scikit-learn==1.3.0 gensim==4.3.2 nltk==3.8.1 pymongo==4.6.1

# 复制 package.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制所有文件
COPY . .

# 暴露端口
EXPOSE 12000

# 默认启动命令
CMD ["node", "server.js"] 