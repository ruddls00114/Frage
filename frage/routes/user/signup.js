
const express = require('express');
const router = express.Router();
const _crypto = require('crypto');
const async = require('async');
const bodyParser = require('body-parser');

const db = require('../../module/pool.js');

/*
    회원가입
 Method : Post
 */
router.post('/', async (req, res, next) => {
    let { id, pwd, name, major, intro   } = req.body;

    let selectIdQuery =
        `
    SELECT idx
    FROM users
    WHERE id = ?
    `;

    let result = {};

    try {
        let selectIdResult = await db.Query(selectIdQuery, [id]);
        if (selectIdResult.length > 0) {
            return next("1401"); // "description": "아이디가 중복됩니다.",
        }

        let insertUserQuery =
                `
            INSERT INTO users(id, pwd, name, major, image, intro)
            VALUES(?, ?, ?, ?, ?, ?);
            `;
            
        let userResult = await db.Query(insertUserQuery, [id, pwd, name, major,'https://s3.ap-northeast-2.amazonaws.com/kyoung/frage.png',intro]);

        return res.r();

    } catch (error) {
        return next(error);
    }
});


module.exports = router;