
const express = require('express');
const router = express.Router();
const async = require('async');
const bodyParser = require('body-parser');
const db = require('../../module/pool.js');
const moment = require('moment');
const upload = require('../../module/multer.js');



/*
    글 등록 
 Method : Post 
 */
router.post('/', upload.single('frage_image'),async (req, res, next) => {
    const {user_idx, title, category, content} =req.body;

    let selectUserQuery = 
    `
    SELECT name
    FROM users
    WHERE idx = ?
    `

    let insertQuery = 
    `
    INSERT INTO boards(title, category, content, frade_image, writetime, updatedate, user_ name)
    VALUES(?, ?, ?, ?, ? ,? ,?)
    `

    try {
        let userResult = await db.Query(selectUserQuery,[user_idx]);
        let insertResult = await db.Query(insertQuery,[title, category, content, req.file.location[0],moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"), userResult[0].name]);
        
        
    } catch (error) {
        return next(error);
    }
    return res.r();

});




module.exports = router;