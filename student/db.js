var mysql=require("mysql");
const DB={	    
	host : '192.168.1.73',	    
	user : 'root',	    
	password : 'digipower',   
	database : 'student'
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