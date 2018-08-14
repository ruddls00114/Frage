
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
router.post('/',upload.single('frage_image'),async (req, res, next) => {
    const {user_idx, title, category, content} =req.body;

    var frage_image = req.file ? req.file.location : null;
    
    let selectUserQuery = 
    `
    SELECT name
    FROM users
    WHERE idx = ?
    `
    let insertQuery = 
    `
    INSERT INTO boards(title, category, content, frage_image, writedate, updatedate, user_name)
    VALUES(?, ?, ?, ?, ? ,? ,?)
    `

    try {
        let userResult = await db.Query(selectUserQuery,[user_idx]);

        let insertResult = await db.Query(insertQuery,[title, category, content, frage_image,moment().format('YYYY-MM-DD hh:mm'), moment().format("YYYY-MM-DD hh:mm"), userResult[0].name]);

        
    } catch (error) {
        return next(error);
    }
    return res.r();

});

/*
    글 수정
 Method : Put 
 */
router.put('/',upload.single('frage_image'),async (req, res, next) => {
    const {idx, title, content} =req.body;

    var frage_image = req.file ? req.file.location : null;
    
    
    let updateQuery = 
    `
    UPDATE boards
    SET title = ?,content = ? , frage_image = ? ,updatedate = ?
    WHERE idx = ?
    `

    try {

        let updateResult = await db.Query(updateQuery,[title, content, frage_image,moment().format("YYYY-MM-DD hh:mm"), Number(idx)]);

        
    } catch (error) {
        return next(error);
    }
    return res.r();

});

/*
    글 삭제
 Method : Put 
 */
router.delete('/',async (req, res, next) => {
    const {idx} =req.query;


    
    
    let deleteQuery = 
    `
    DELETE FROM boards
    WHERE idx = ?
    `

    try {

        let deleteResult = await db.Query(deleteQuery,[idx]);

        
    } catch (error) {
        return next(error);
    }
    return res.r();

});





module.exports = router;