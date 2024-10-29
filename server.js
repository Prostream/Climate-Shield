const express = require('express');
const cors = require('cors');
const app = express();

// 随机生成一些用户数据存放在数组中
const users = [
  { username: '1', password: '1' },
  { username: '999', password: '1234' },
  { username: 'HaoyangTan', password: '2233' },
];

// 中间件配置
app.use(cors());
app.use(express.json());

// 测试路由
// 路由示例
app.get('/', (req, res) => {
    res.send('Hello from Express!');
  });

// 登录接口
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // 查找匹配的用户
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.status(200).json({ message: 'Login successful', user: { username: user.username } });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// 设置服务器端口
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
