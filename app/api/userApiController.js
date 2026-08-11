const User = require('../models/UserModel');
const bcrypt = require("bcrypt");

module.exports = {
    create: (req, res) => {
        const newUser = User(req.body);
        newUser.save()
        .then(()=>{
            // We do not send the password back
            res.status(201).json({name: newUser.name, email: newUser.email});
        })
        .catch((err)=>{
             if(err.code === 11000) {
                res.status(409).json({
                    error: true,
                    message: "Username already exists",
                })
            }
        })
        },
        login: (req, res) => {
               // We first need to check if the user exists
            //    Find one because we only want to find one specific one. Then we wanna search by email thats assigned
               User.findOne({ email: req.body.email })
               .then((user)=>{
                    console.log(user);
                    // If the user does not exist
                    if(!user) {
                        // error:true so the condition for error is met to display the error from loginUser.hbs
                        res.status(400).json({
                            error: true,
                            message: "That user does not exist",
                        })
                        return;
                    }
        
                    bcrypt.compare(req.body.password, user.password, (err, logged)=>{
                        // res.send(logged);
        
                        if(err) {
                            res.status(500).json({
                            error: true,
                            message: "Login error",
                        });
                        return;
                    }
                        if(logged) {
                            // We will get a jwt token that we set the method for under generateAuthToken method
                          const token = user.generateAuthToken(user);
                        //   Saving the token in the cookies
                          res.status(200).json({
                            name: user.name,
                            jwt: token,
                          });
                        } else {
                            res.status(400).json({
                            error: true,
                            message: "Login data do not match",
                        });
                        return;
                        }
               });
            })
               .catch((err)=>{
                res.status(500).json({error: err})
               })
            },
}