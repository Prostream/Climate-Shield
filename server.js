const express = require('express');
const cors = require('cors');
const path = require('path');
const { users, posts } = require('./data');

const app = express();

// 中间件配置
app.use(cors());
app.use(express.json());
// 静态文件托管
app.use(express.static(path.join(__dirname, 'Client/build')));

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

// 获取所有帖子
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// 添加新帖子
app.post('/api/posts', (req, res) => {
  const { title, content, type, tags, image, location, category } = req.body;
  const newPost = { id: Date.now(), title, content, type, tags, image, location, category };
  posts.push(newPost);
  res.json(newPost);
});

// 搜索帖子接口
app.get('/api/posts/search', (req, res) => {
  const query = req.query.query || '';
  console.log('用户输入的内容:', query);
  res.json({
    success: true,
    data: query
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 设置服务器端口
const PORT = process.env.PORT || 12000;

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

