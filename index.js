const express = require('express')
const router = require('./routes/router')
const app = express()
const port = 5600
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs')
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
