
const express = require('express');
const router = express.Router();
const async = require('async');
const bodyParser = require('body-parser');
const db = require('../../module/pool.js');
const upload = require('../../module/multer.js');



/*
    글 상세내용
 Method : get
 */
router.post('/', upload.fields([{ name: 'image_profile', maxCount: 1 }]), async (req, res, next) => {
    const {title, category, contents, frage_image} =req.body;


});





module.exports = router;