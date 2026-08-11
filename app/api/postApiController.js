const Post = require('../models/PostModel');
const User = require('../models/UserModel');

module.exports = {
    index: (req, res) => {
        const findConfig= req.query.authorId? {author: req.query.authorId}: {};
                Post.find({})
                .populate('author')
                .lean().then((posts)=>{
                    res.status(200).json(posts);
                }).catch((err)=>{
                    res.status(500).json({error: err});
                });
    }
}