const mysql = require('promise-mysql');
const dbConfig = {
	host : 'mydbinstance.c2bngguywplz.ap-northeast-2.rds.amazonaws.com',
	port : '3306',
	user : 'kyoungin',
	password : 'ruddls114',
	database : 'kyounginDB',
	connectionLimit : 10
};

const dbpool = mysql.createPool(dbConfig);

module.exports = dbpool;