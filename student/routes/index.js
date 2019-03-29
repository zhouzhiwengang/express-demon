var express = require('express');
var db=require('./../db.js');
var router = express.Router();
var bodyParser=require("body-parser");

//创建application/x-www-form-urlencoded编码解析
var urlencodedParser=bodyParser.urlencoded({extended:false});

/* GET home page. */
router.get('/user.html', function(req, res) {
  res.sendfile("./views/user.html");    //前端HTML页面文件
});

router.post('/sub',urlencodedParser,function(req,res,next){
	var mysqlParams=[    //获取HTML表单发送来的数据
		    req.body.name,
		    req.body.chinese,
		    req.body.english,
		    req.body.math	
	];
	var mysqlQuery='insert into student(name,chinese,english,math) values (?,?,?,?)';
	db.DBConnection.query(mysqlQuery,mysqlParams,function(err,rows,fields){
		if(err){
			console.log(err);	
		    	return;		
		}		
		var success={			    
			message: '增加成功'
		};
		 res.send(success);	
	});
});



module.exports = router;
