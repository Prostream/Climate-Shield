FROM node:16 as build

WORKDIR /app

# 复制前端项目文件
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 第二阶段：生产环境
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# 添加nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 