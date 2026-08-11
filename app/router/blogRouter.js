const express = require("express");
const router = express.Router();

const postController = require('../controllers/postController');

// Whenever trying to acces the main page of the blog, this will happen. This can be used for limiting access for specific users( for example not logged in)

router.get('/', postController.index);
router.get('/add', (_req, res)=>{
    res.render("blogViews/addPost")
});
router.post('/add', postController.create);
router.get('/:id', postController.post);

router.post('/edit/:id', postController.update);
router.get('/edit/:id', postController.editForm);

router.get('/delete/:id', postController.delete);

module.exports = router