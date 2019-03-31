var express = require('express');
var router = express.Router();

var db=require('./../db.js'); // 引入自定义DB 模块
var bodyParser=require("body-parser");  //引入body-parser模块
//创建application/x-www-form-urlencoded编码解析
var urlencodedParser=bodyParser.urlencoded({extended:false});

//访问网站跟目录：localhost:3000/
router.get('/', function(req, res, next) {
	db.DBConnection.query(
	'select * from movie',
	  function(err, result) {
		return res.render('index.jade',{
			title:'网站首页',
			movies: result
		});
	  }
	); 
});

//localhost:3000/movie/1
router.get("/movie/:id",function(req,res){
	db.DBConnection.query(
	'select * from movie where id = ?',
	[req.params.id], // 路由参数获取:id
	  function(err, result) {
		console.log({
			title:'电影详情',
			movies: result
		});
		return res.render('detail.jade',{
			title:'电影详情',
			movie: result[0]
		});
	  }
	); 
});


//localhost:3000/admin/add
router.get("/admin/add",function(req,res){
    res.render('control.jade',{
        title:'后台电影添加页',
        movie:{
            title:'',
            director:'',
            country:'', 
            language:'',
            year:'',
            poster:'',
            summary:'',
            flash:''
        }
    });
});


//localhost:3000/admin/list
router.get("/admin/list",function(req,res){
	db.DBConnection.query(
	'select * from movie',
	  function(err, result) {
		return res.render('list.jade',{
			title:'后台电影列表',
			movies: result
		});
	  }
	); 
});

//localhost:3000/admin/do
router.post("/admin/do", urlencodedParser, function(req,res,next){
	var params =[
		req.body.title,
        req.body.director,
        req.body.country, 
        req.body.language,
        '2019',
        req.body.summary
	]
	console.log(params);
	var query ='insert into movie (title,director,country,language,year,summary) values (?,?,?,?,?,?)';
	db.DBConnection.query(query,params,function(err,rows,fields){
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
