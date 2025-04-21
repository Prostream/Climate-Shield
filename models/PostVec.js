const mongoose = require('mongoose');

const PostVecSchema = new mongoose.Schema({
    postId: mongoose.Schema.Types.ObjectId,  // MongoDB 原始 Post 的 _id
    vector: [Number]                         // 平均词向量数组
});

module.exports = mongoose.model('PostVec', PostVecSchema, 'post_vectors');
