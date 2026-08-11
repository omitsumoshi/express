const express = require("express");
const router = express.Router();

const postApiController = require('../api/postApiController.js');

router.get('/', postApiController.index);


module.exports = router;