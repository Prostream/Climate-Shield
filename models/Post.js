const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    type: String,
    tags: [String],
    location: String,
    category: String
});

module.exports = mongoose.model('Post', postSchema);