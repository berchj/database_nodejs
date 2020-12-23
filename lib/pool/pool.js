const mysql = require('mysql2')
const pool = mysql.createPool({
    connectionLimit:20,
    host:'localhost',
    user:'',
    password:'',
    database:'test',
    multipleStatements:true
})
module.exports = pool 
