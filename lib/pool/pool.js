const mysql = require('mysql2')
const pool = mysql.createPool({
    connectionLimit:20,
    host:'localhost',
    user:'berchj',
    password:'Asharot13!',
    database:'test',
    multipleStatements:true
})
module.exports = pool 