
const express = require('express');
const router = express.Router();
const async = require('async');
const bodyParser = require('body-parser');
const db = require('../../module/pool.js');
const moment = require('moment');
const upload = require('../../module/multer.js');

//댓글 내용, 작성자 id, name, 날짜

/*
    댓글 가져오기 
 Method : Get
 */
router.get('/', async (req, res, next) => {
    const { board_idx } = req.query;

    let userResult;
    let selectUserQuery =
        `
    SELECT content,writedate, user_idx, users.name,
    FROM replys
    LEFT JOIN users ON replys.user_idx =users.idx
    WHERE board_idx = ?
    `
    try {
        userResult = await db.Query(selectUserQuery, [board_idx]);


    } catch (error) {
        return next(error);
    }
    return res.r(userResult);

});

/*
    댓글 쓰기
Method : Post
*/
router.post('/', async (req, res, next) => {
    const { board_idx, user_idx, content } = req.body;

    // var frage_image = req.file ? req.file.location : null;
    let userResult;
    let insertQuery =
        `
            INSERT INTO replys(board_idx,user_idx,content, writedate)
            VALUES(?, ?, ?, ?)
            `
    try {
        insertQuery = await db.Query(insertQuery, [board_idx, user_idx, content, moment().format('YYYY-MM-DD hh:mm')]);


    } catch (error) {
        return next(error);
    }
    return res.r();

});



module.exports = router;