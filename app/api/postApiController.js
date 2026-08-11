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
    },
    post: (req, res) =>{
            Post.findById(req.params.id)
            .populate('author')
            .lean().then((post)=>{
                res.status(200).json(post);
            }).catch((err)=>{
               res.status(404).json({error: 'Resource not found'});
            })
        },
         create:(req, res) =>{
                // Spreading(making a copy) of read data and adding an author field to it
                const newPost = new Post({...req.body, author: '6a70db557a566ec8f22f7732' });
                newPost.save();
        
                User.updateOne(
                    { _id: '6a70db557a566ec8f22f7732' },
                    {$push: { posts: newPost._id }})
                    .catch((err)=>{
                    res.status(500).json({error: err});
                })
                res.status(201).json(newPost);
            },
            update: (req, res) => {
                    Post.findByIdAndUpdate(req.params.id, req.body)
                    .then((post)=>{
                        res.status(204).json(post);
                    })
                    .catch((err)=>{
                        res.status(500).json({error: err});
                    })
                },
                delete: (req, res) =>{
                        Post.findByIdAndDelete(req.params.id)
                        .populate('author')
                        .then((post)=>{
                
                             User.updateOne(
                            { _id: post.author._id },
                            {$pull: { posts: req.params.id }})
                
                        res.status(204);
                        })
                         .catch((err)=>{
                        res.status(500).json({error: err});
                         })
                    }

}