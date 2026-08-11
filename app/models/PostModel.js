const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        // Referencja do ObjectId ktory mamy w basie w MongoDB
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true}
);

module.exports = mongoose.model('Post', Post)