const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }]
}, {
    timestamps: true
});
// How to "encrypt" the password
User.pre('save', async function() {
    const user = this;
 
    if(!user.isModified('password')) {
        return;
    }
 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash
    // bcrypt.genSalt(10, function(err, salt) {
    //     if (err) {
    //         res.send(err);
    //     }
 
    //     bcrypt.hash(user.password, salt, function(err, hash) {
    //         if (err) {
    //             res.send(err);
    //         }
 
    //         user.password = hash;
    //     })
    // })
});

User.methods.generateAuthToken = (user) => {
    // Method sign will be responsible for generating the token and the token needs to be connected to an users information?
    // When decoding the token, it will return the user id. Second field is a string of symbols, third one is configuration item. Here we get the token to expire in 1hr
    const token = jwt.sign({_id: user._id}, "secretKey", { expiresIn: "1h"});
    // The generated token will be returned here:
    return token;
}


module.exports = mongoose.model('User', User)