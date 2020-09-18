const mysql = require('mariadb');
const connection = mysql.createPool({
  host: 'localhost',
  port: 3360,
  user: 'root',
  password: 'root',
  database: 'shop'
});

module.exports=connection;