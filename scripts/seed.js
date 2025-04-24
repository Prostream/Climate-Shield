const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
const { posts, users } = require('../data');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/climateShield', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to MongoDB, seeding data...');

    // 清空旧数据（可选）
    await Post.deleteMany({});
    await User.deleteMany({});

    // 直接插入原始数据，无需添加 postid
    await Post.insertMany(posts);
    await User.insertMany(users);

    console.log('Seeding completed!');
    process.exit();
}).catch(err => {
    console.error('Error seeding data:', err);
    process.exit(1);
});