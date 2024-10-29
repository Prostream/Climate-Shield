const express = require('express');
const cors = require('cors');
const app = express();

// 用于模拟的用户数据库
const users = [
  { username: 'HaoyangTan', password: '2233', email: 'jeff.tandev@gmail.com', phoneNumber: '7187914228' },
  { username: '999', password: '1234', email: 'user2@example.com', phoneNumber: '0987654321' },
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



// 注册接口
app.post('/api/register', (req, res) => {
  const { username, password, email, phoneNumber, gender, birthday, address, postalCode } = req.body;

  // 检查用户名或邮箱是否已经存在
  const existingUser = users.find(user => user.username === username || user.email === email);
  
  if (existingUser) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }

  // 创建新用户并添加到用户数组中
  const newUser = {
    username,
    password,
    email,
    phoneNumber,
    gender,
    birthday,
    address,
    postalCode,
  };
  
  users.push(newUser);
  
  res.status(200).json({ message: 'Registration successful', user: newUser });
});

// 设置服务器端口
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
