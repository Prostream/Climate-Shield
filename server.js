const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/climateShield', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed:', err));

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
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      res.status(200).json({ message: 'Login successful', user: { username: user.username } });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
});

// ✅ 注册接口（保存用户到数据库）
app.post('/api/register', async (req, res) => {
  const { username, password, email, phoneNumber, gender, birthday, address, postalCode } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const newUser = new User({
      username,
      password,
      email,
      phoneNumber,
      gender,
      birthday,
      address,
      postalCode
    });

    await newUser.save();
    res.status(200).json({ message: 'Registration successful', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
});

// ✅ 获取所有帖子（从 MongoDB 查询）
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts', error: err });
  }
});

// ✅ 添加新帖子（保存到 MongoDB）
app.post('/api/posts', async (req, res) => {
  const { title, content, type, tags, image, location, category } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      type,
      tags,
      image,
      location,
      category
    });

    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post', error: err });
  }
});

// ✅ 搜索帖子（这里只是模拟返回输入内容）
app.get('/api/posts/search', (req, res) => {
  const query = req.query.query || '';
  console.log('搜索内容:', query);
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

