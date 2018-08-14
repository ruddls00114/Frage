var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user',require('./user/user_index'))
router.use('/board',require('./board/board_index'))

module.exports = router;
