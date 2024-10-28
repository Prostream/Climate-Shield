const express = require('express');
const cors = require('cors');
const app = express();

// 中间件配置
app.use(cors());
app.use(express.json());

// 测试路由
// 路由示例
app.get('/', (req, res) => {
    res.send('Hello from Express!');
  });

// 设置服务器端口
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
