const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController')

router.get('/signup', (_req, res)=>{
    res.render("userViews/signUpUser")
});
router.post('/signup', userController.create);

router.get('/login', (req, res)=>{
    if(req.query.loginRedirect){
        res.render("userViews/loginUser", {
            error: true,
            message: "Please log in to use app"
        })
        return;
    }

    res.render("userViews/loginUser")
});
router.post('/login', userController.login);
router.post('/logout', userController.logout);



module.exports = router;