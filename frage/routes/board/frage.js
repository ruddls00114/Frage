
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
    console.log(req.file.location)
    let insertQuery = 
    `
    INSERT INTO boards(title, category, content, frage_image, writedate, updatedate, user_name)
    VALUES(?, ?, ?, ?, ? ,? ,?)
    `

    try {
        let userResult = await db.Query(selectUserQuery,[user_idx]);
        console.log(userResult[0].name)
        let insertResult = await db.Query(insertQuery,[title, category, content, req.file.location,moment().format('YYYY-MM-DD hh:mm'), moment().format("YYYY-MM-DD hh:mm"), userResult[0].name]);
        console.log(userResult)
        
    } catch (error) {
        return next(error);
    }
    return res.r();

});




module.exports = router;