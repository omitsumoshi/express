const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

module.exports = {
    create: (req, res) => {
        const newUser = User(req.body)
        newUser.save()
        .then(()=>{
            res.redirect('/blog');
        })
        .catch((err)=>{
             if(err.code === 11000) {
                console.log(err)
                res.render('userViews/signUpUser', {
                    error: true,
                    message: "Username already exists",
                    user: req.body
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
                res.render('userViews/loginUser', {
                    error: true,
                    message: "That user does not exist",
                    user: req.body
                })
                return;
            }

            bcrypt.compare(req.body.password, user.password, (err, logged)=>{
                // res.send(logged);

                if(err) {
                    res.render('userViews/loginUser', {
                    error: true,
                    message: "Login error",
                    // Clearing the password, so its not stored
                    user: {email: req.body.email, password: ""},
                });
                return;
            }
                if(logged) {
                    // We will get a jwt token that we set the method for under generateAuthToken method
                  const token = user.generateAuthToken(user);
                //   Saving the token in the cookies
                  res.cookie("AuthToken", token);
                  res.redirect("/blog");
                } else {
                    res.render('userViews/loginUser', {
                    error: true,
                    message: "Login data do not match",
                    // Clearing the password, so its not stored
                    user: {email: req.body.email, password: ""},
                });
                return;
                }
       });
    })
       .catch((err)=>{
        res.send(err)
       })
    },
    logout: (_req, res) => {
        res.clearCookie('AuthToken');
        res.redirect('/user/login');
    }
}

  