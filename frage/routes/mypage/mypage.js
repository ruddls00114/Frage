
const express = require('express');
const router = express.Router();
const async = require('async');
const bodyParser = require('body-parser');
const db = require('../../module/pool.js');
const moment = require('moment');
const upload = require('../../module/multer.js');



/*
    마이페이지
 Method : Get
 */
router.get('/',async (req, res, next) => {
    const {user_idx} =req.query;

    // var frage_image = req.file ? req.file.location : null;
    
    let selectUserQuery = 
    `
    SELECT name, id, major, intro, image
    FROM users
    WHERE idx = ?
    `
    try {
        let userResult = await db.Query(selectUserQuery,[user_idx]);

        return res.r(userResult);

    } catch (error) {
        return next(error);
    }

});


router.get('/count', async(req, res, next) => {
    const {user_idx} = req.query;

    let result;
    try {
        
        const sql = 
        `
        SELECT count(b.idx) AS board_count, count(r.idx) AS reply_count 
        FROM boards AS b 
        LEFT JOIN reply AS r ON b.user_idx = r.user_idx 
        WHERE b.user_idx = ?;
        `;

        result = await db.Query(sql, [user_idx]);
    } catch (error) {
        return next(error);
    }

    return res.r(result);
});

router.get('/list', async(req, res, next) => {
    const {user_idx} = req.query;

    let result;
    try {

        const sql = 
        `
        SELECT *
        FROM boards
        WHERE user_idx = ?;
        `;

        result = await db.Query(sql, [user_idx]);
    } catch(error) {
        return next(error);
    }

    return res.r(result);
});


module.exports = router;