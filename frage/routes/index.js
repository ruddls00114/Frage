var express = require('express');
var router = express.Router();

router.use('/users',require('./user/user_index'))
router.use('/board',require('./board/board_index'))
router.use('/mypage',require('./mypage/mypage_index'))

module.exports = router;
