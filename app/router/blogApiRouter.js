const express = require("express");
const router = express.Router();

const postApiController = require('../api/postApiController.js');

router.get('/', postApiController.index);
router.get('/:id', postApiController.index);
router.post('/', postApiController.create);
router.put('/:id', postApiController.create);
router.delete('/:id', postApiController.create);


module.exports = router;