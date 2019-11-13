const mysql=require("mysql")
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123654',
  database : 'shunli_100001'
});

connection.connect((error)=>{
    if(error){
        console.log("链接不成功")
    }else{
        console.log("链接成功")

    }
});

module.exports=connection