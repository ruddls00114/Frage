var express = require('express');
var router = express.Router();

router.use('/',require('./main'))
router.use('/frage',require('./frage'))

module.exports = router;
