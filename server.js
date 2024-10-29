const express = require('express');
const cors = require('cors');
const app = express();

// 用于模拟的用户数据库
const users = [
  { username: 'HaoyangTan', password: '2233', email: 'jeff.tandev@gmail.com', phoneNumber: '7187914228' },
  { username: '999', password: '1234', email: 'user2@example.com', phoneNumber: '0987654321' },
];

// 模拟数据库的帖子数组
const posts = [
  {
    id: 1,
    title: 'Need assist on purified water for a family',
    content: 'ZIP code xxxxxx, need assistance, contact: 123-456-8901',
    type: 'Need-emergency',
    tags: ['food', 'Emergency'],
    location: 'San Jose'
  },
  {
    id: 2,
    title: 'Wheelchair available for assistance',
    content: 'ZIP code xxxxxx, one wheelchair available, contact: 123-456-789',
    type: 'offer',
    tags: ['necessities', 'Regular'],
    location: 'San Jose'
  },
  {
    id: 3,
    title: 'Food packages available for donation',
    content: 'Offering non-perishable food items. ZIP code xxxxxx. Contact: 345-678-9012',
    type: 'offer',
    tags: ['food', 'Regular'],
    location: 'San Jose'
  },
  {
    id: 4,
    title: 'Urgent medical supplies needed',
    content: 'In need of bandages, antiseptics. ZIP code xxxxxx. Contact: 456-789-0123',
    type: 'Need-emergency',
    tags: ['medical', 'Emergency'],
    location: 'San Jose'
  },
  {
    id: 5,
    title: 'Urgent request for baby supplies',
    content: 'Need diapers and baby formula. ZIP code xxxxxx. Contact: 678-901-2345',
    type: 'Need-emergency',
    tags: ['baby care', 'Emergency'],
    location: 'San Jose'
  },
  {
    id: 6,
    title: 'Available carpool for school pick-ups',
    content: 'Offering carpool service in area xxxxxx. Contact: 789-012-3456',
    type: 'offer',
    tags: ['transportation', 'Regular'],
    location: 'San Jose'
  },
  {
    id: 7,
    title: 'Seeking support for temporary shelter',
    content: 'Urgently need temporary shelter. ZIP code xxxxxx. Contact: 890-123-4567',
    type: 'Need-regular',
    tags: ['housing'],
    location: 'San Jose'
  },
  {
    id: 8,
    title: 'Request for urgent flood relief supplies',
    content: 'Need relief supplies like blankets and canned food. ZIP code xxxxxx. Contact: 901-234-5678',
    type: 'Need-emergency',
    tags: ['relief', 'Emergency'],
    location: 'North Carolina'
  },
  {
    id: 9,
    title: 'Offering furniture for families in need',
    content: 'Available used furniture for those affected by recent storms. ZIP code xxxxxx. Contact: 123-456-7890',
    type: 'offer',
    tags: ['furniture', 'Assistance'],
    location: 'North Carolina'
  },
  {
    id: 10,
    title: 'Looking for temporary pet shelter',
    content: 'Need temporary shelter for pets during house repairs. ZIP code xxxxxx. Contact: 234-567-8901',
    type: 'Need-regular',
    tags: ['pet care', 'Assistance'],
    location: 'North Carolina'
  },
  {
    id: 11,
    title: 'Urgent blood donation needed',
    content: 'Requesting blood donations for local hospital patients. ZIP code xxxxxx. Contact: 345-678-9012',
    type: 'Need-emergency',
    tags: ['medical', 'Emergency'],
    location: 'North Carolina'
  },
  {
    id: 12,
    title: 'Offering free child care for working parents',
    content: 'Free child care for families affected by recent events. ZIP code xxxxxx. Contact: 456-789-0123',
    type: 'offer',
    tags: ['child care', 'Support'],
    location: 'North Carolina'
  }
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

// 获取所有帖子
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// 添加新帖子
app.post('/api/posts', (req, res) => {
  const newPost = { ...req.body, id: posts.length + 1 };
  posts.push(newPost);
  res.json(newPost);
});

// 设置服务器端口
const PORT = process.env.PORT || 12000;

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
