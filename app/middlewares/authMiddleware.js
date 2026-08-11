const jwt = require('jsonwebtoken');
const User = require("../models/UserModel")

module.exports = (req, res, next) => {
        const token =  req.cookies["AuthToken"]

        if(token) {
             
            try {
                const verified = jwt.verify(token, process.env.TOKEN_KEY);
                User.findById(verified._id).then((user)=>{
                    // Creating global zmienne that we can use for example in handlebars
                    res.locals.userId = verified._id;
                    res.locals.userName = user.name
                    next()
                })
                .catch((err)=>{
                    res.send(err)
                })
            } catch {
                res.redirect('/user/login?loginRedirect=true')
            }
        } else {
            res.redirect('/user/login?loginRedirect=true')
        }
}