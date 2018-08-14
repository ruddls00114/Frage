
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

        
    } catch (error) {
        return next(error);
    }
    return res.r(userResult[0]);

});



module.exports = router;