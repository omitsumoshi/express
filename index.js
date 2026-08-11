const express = require('express');
const app = express();
const hbs = require("express-handlebars");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Connecting to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/express-blog');

const Post = require('./app/models/PostModel');

const blogRouter = require('./app/router/blogRouter');
const blogApiRouter = require('./app/router/blogApiRouter');
const userRouter = require('./app/router/userRouter');

const authMiddleware = require("./app/middlewares/authMiddleware");

app.use('/files', express.static('public'))


// Setting our engine as handlebars engine. This is basic configuration to use handlebars
app.engine('hbs', hbs.engine({extname: '.hbs'}));
app.set("view engine", "hbs");
// Express configuration that allows us to read data from the form
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());


app.get("/mongoose/:id", function(req, res){
    // const posts = await Post.find().exec();
    // res.send(posts)
    Post.findById(req.params.id).then((post)=>{
        res.render("home", {
            title: post.title,
            content: post.content,
            displayTitle: true,
            names: ["Adam", "Ola", "Kasia", "Tomek"],
        })
    }).catch((err)=>{
        res.send(err)
    })
});

// This will help us set routing to our server. in function, req allows us to get requests, res will be the reponse.
// The server at this point will not be refreshing on its own. In order to do this, we need to install an additional library, for example nodemon
app.get('/', function(_req, res){
    res.render("home", {
        title: 'My app title', 
        content: 'Lorem ipsum', 
        displayTitle: true,
    names: ["Adam", "Ola", "Kasia", "Tomek"]})
});

// Router
app.use("/blog", authMiddleware, blogRouter);
app.use("/user", userRouter);

// Api Router

// app.use("/api/posts", blogApiRouter);

// In order for app.get to work, we also need to set the server
app.listen(8080, function(){
    console.log('Server Node.js is working')
});