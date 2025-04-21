const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');
const PostVec = require('./models/PostVec');
const { spawn } = require('child_process');

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

// 添加计算余弦相似度的函数
function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const norm1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const norm2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (norm1 * norm2);
}

// ✅ 搜索帖子
app.get('/api/vector', async (req, res) => {
  const query = req.query.query || '';
  console.log('🟢 收到关键词:', query);

  // 根据操作系统选择 Python 命令
  const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
  const python = spawn(pythonCommand, ['vector_search.py', query]);

  let result = '';

  // ✅ 收集输出内容
  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  // ✅ 打印 Python 错误输出
  python.stderr.on('data', (data) => {
    console.error('[Python stderr]:', data.toString());
  });

  python.on('close', async (code) => {
    if (!result || result.trim().length === 0) {
      console.error('❌ Python 没有返回任何内容');
      return res.status(500).json({ success: false, message: 'Python 无输出或出错' });
    }

    try {
      const queryVector = JSON.parse(result);
      console.log('✅ 成功获取词向量（前5维）:', queryVector.slice(0, 5));

      // 从 MongoDB 获取所有帖子向量
      const postVectors = await PostVec.find({});
      
      // 计算相似度并排序
      const similarities = postVectors
        .filter(post => post.vector && Array.isArray(post.vector)) // 确保向量存在且格式正确
        .map(post => ({
          postId: post.postId.toString(), // 转换 ObjectId 为字符串
          similarity: cosineSimilarity(queryVector, post.vector)
        }))
        .sort((a, b) => b.similarity - a.similarity);

      // 返回前5个最相似的帖子ID
      const top5Posts = similarities.slice(0, 5);
      
      res.json({ 
        success: true, 
        vector: queryVector,
        similarPosts: top5Posts
      });
    } catch (err) {
      console.error('❌ JSON 解析失败:', err);
      res.status(500).json({ success: false, message: 'JSON 解析失败' });
    }
  });
});

// ✅ 静态资源托管路径
app.use(express.static(path.join(__dirname, 'Client/build')));

// ✅ 放在最后的 catch-all，确保路径正确
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client/build', 'index.html'));
});

// 设置服务器端口
const PORT = process.env.PORT || 12000;

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

