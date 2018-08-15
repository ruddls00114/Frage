
const express = require('express');
const router = express.Router();
const async = require('async');
const bodyParser = require('body-parser');
const db = require('../../module/pool.js');


/*
    게시판 홈 
 Method : get
 */
router.get('/', async (req, res, next) => {

    let result;
    let selectBoardQuery =
    `
    SELECT users.name,users.major, frage_image, title,category, DATE_FORMAT(updatedate,"%Y-%m-%d") as updatedate, content
    FROM boards
    RIGHT JOIN users ON users.idx = boards.user_idx

    `;

    try {
        result = await db.Query(selectBoardQuery,[]);

            
    } catch (error) {
        return next(error);
    }
    return res.r(result);

});


// /*
//    게시판 글 검색
//  Method : get
//  */
// router.get('/', async (req, res, next) => {
//     const {category,data} = req.query;
//     data = "%"+data+"%";
//     let selectQuery;
//     switch(category){
//         case 0: //제목
//         selectQuery = `
//         SELECT iamge, title, tag1, tag2, writedate, user_name
//         FROM boards
//         where title like "?"
//         `;
//         break;

//         case 1://해쉬태그
//         selectQuery = `
//         SELECT iamge, title, tag1, tag2, writedate, user_name
//         FROM boards
//         where tag1 like "?" OR tag2 like "?"
//         `;

//         break;
//     }

//     try {

//         let result = await db.Query(selectQuery,[data]);
        
//     } catch (error) {
//         return next(error);
//     }
//     return res.r(result);

// });



module.exports = router;