//student 文件夹下
var mysql=require("mysql");
const DB={	    
	host : '127.0.0.1',	    
	user : 'root',	    
	password : '123456',   
	database : 'movie'
}
const DBConnection=mysql.createConnection({
	    host:DB.host,	    
	    user:DB.user,
	    password:DB.password,
	    database:DB.database,
	    multipleStatements:true
});
DBConnection.connect();
module.exports.DBConnection=DBConnection;