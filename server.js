const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');
const PostVec = require('./models/PostVec');
const { spawn } = require('child_process');
const axios = require('axios');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/climateShield', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed:', err));

// 中间件配置
app.use(cors());
app.use(express.json());

// 聊天 API 路由
app.post('/api/chat', async (req, res) => {
  try {
    console.log('收到聊天请求:', req.body);
    
    if (!req.body || !req.body.prompt) {
      console.error('请求体格式错误:', req.body);
      return res.status(400).json({ error: '请求体格式错误，缺少 prompt 字段' });
    }

    // 构建请求体
    const requestBody = {
      prompt: req.body.prompt
    };

    console.log('发送到聊天 API 的请求:', requestBody);

    const response = await axios.post('https://56d8-2601-646-8f89-15a0-5515-a0a4-7504-11f.ngrok-free.app/chat', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 100000 // 10秒超时
    });

    console.log('聊天 API 响应:', response.data);
    
    if (!response.data) {
      console.error('API 返回空响应');
      return res.status(500).json({ error: 'API 返回空响应' });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Chat API 代理错误:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status,
      request: error.config?.data
    });
    
    if (error.response) {
      // 如果 API 返回了错误响应
      res.status(error.response.status).json({
        error: '聊天服务错误',
        details: error.response.data,
        request: error.config?.data
      });
    } else if (error.request) {
      // 如果请求已发送但没有收到响应
      res.status(504).json({
        error: '聊天服务超时',
        details: '无法连接到聊天服务'
      });
    } else {
      // 其他错误
      res.status(500).json({
        error: '服务器内部错误',
        details: error.message
      });
    }
  }
});

// 测试路由
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

// 注册接口
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

// 获取所有帖子
app.get('/api/posts', async (req, res) => {
  try {
    console.log('收到获取帖子请求');
    const posts = await Post.find({});
    console.log('查询到的帖子数量:', posts.length);
    console.log('返回的帖子数据:', posts);
    res.json(posts);
  } catch (err) {
    console.error('获取帖子失败:', err);
    res.status(500).json({ message: 'Failed to fetch posts', error: err });
  }
});

// 添加新帖子
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

// 搜索帖子
app.get('/api/vector', async (req, res) => {
  const query = req.query.query || '';
  console.log('🟢 收到关键词:', query);

  // 根据操作系统选择 Python 命令
  const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
  const python = spawn(pythonCommand, ['/app/vector_search.py', query], {
    cwd: '/app'  // 设置工作目录
  });

  let result = '';

  // 收集输出内容
  python.stdout.on('data', (data) => {
    result += data.toString().trim();
  });

  // 打印 Python 错误输出
  python.stderr.on('data', (data) => {
    console.error('[Python stderr]:', data.toString());
  });

  python.on('close', async (code) => {
    console.log('Python进程退出码:', code);
    
    if (!result || result.trim().length === 0) {
      console.error('❌ Python 没有返回任何内容');
      return res.status(500).json({ success: false, message: 'Python 无输出或出错' });
    }

    try {
      const response = JSON.parse(result);
      if (response.error) {
        console.error('❌ Python 返回错误:', response.error);
        return res.status(500).json({ success: false, message: response.error });
      }
      
      const queryVector = response.vector;
      console.log('✅ 成功获取词向量（前5维）:', queryVector.slice(0, 5));

      // 从 MongoDB 获取所有帖子向量
      const postVectors = await PostVec.find({});
      console.log('✅ 从数据库获取到向量数量:', postVectors.length);
      
      // 计算相似度并排序
      const similarities = postVectors
        .filter(post => post.vector && Array.isArray(post.vector)) // 确保向量存在且格式正确
        .map(post => ({
          postId: post.postId, // 直接使用ObjectId
          similarity: cosineSimilarity(queryVector, post.vector)
        }))
        .sort((a, b) => b.similarity - a.similarity);

      console.log('✅ 计算得到相似度数量:', similarities.length);

      // 返回前5个最相似的帖子ID
      const top5Posts = similarities.slice(0, 5);
      console.log('✅ 返回前5个相似帖子:', top5Posts);
      
      // 获取完整的帖子信息
      const postIds = top5Posts.map(p => p.postId);
      const posts = await Post.find({ _id: { $in: postIds } });
      console.log('✅ 获取到完整帖子数量:', posts.length);
      
      // 将相似度信息添加到帖子中
      const postsWithSimilarity = posts.map(post => {
        const similarityInfo = top5Posts.find(p => p.postId.toString() === post._id.toString());
        return {
          ...post.toObject(),
          similarity: similarityInfo ? similarityInfo.similarity : 0
        };
      });
      
      res.json({ 
        success: true, 
        vector: queryVector,
        similarPosts: postsWithSimilarity
      });
    } catch (err) {
      console.error('❌ JSON 解析失败:', err);
      res.status(500).json({ success: false, message: 'JSON 解析失败' });
    }
  });
});

// 设置服务器端口
const PORT = process.env.PORT || 12000;

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

