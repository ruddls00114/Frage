
const express = require('express');
const router = express.Router();
const _crypto = require('crypto');
const async = require('async');
const bodyParser = require('body-parser');
const db = require('../../module/pool.js');
const secretKey = 'secret';


function encrypt(u_password) {
    const encrypted = _crypto.createHmac('sha512', secretKey).update(u_password).digest('base64');
    return encrypted;
}



/*
    로그인
 Method : Post
 */
router.post('/', async (req, res, next) => {
    let { id, pwd } = req.body;
    // pwd =encrypt(pwd)

    let selectUserQuery =
    `
    SELECT id, name, major, image, intro
    FROM users
    WHERE id = ? and pwd = ?
    `;

    try {
        let result = await db.Query(selectUserQuery, [id,pwd]);
        if(!result[0]){
            return next("401");
        }
        if(result.length > 0){
            return res.r(result[0]);
        }
        else{
            return next("401");
        }
    } catch (error) {
        return next(error);
    }


});


module.exports = router;