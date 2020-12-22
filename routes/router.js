const express = require('express')
const router = express.Router()
const pool = require('../lib/pool/pool')

router.get('/',(req,res)=>{
    pool.getConnection((error,PoolConnection)=>{
        if(error) throw error
        let q = `SELECT * FROM data`
        PoolConnection.query(q,(error,rows,fields)=>{
            if(error) throw error
            return res.render('../public/views/index.ejs',{data:rows});
        })
        PoolConnection.release()
    })
})

router.get('/insert',(req,res)=>{
    res.render('../public/views/insert.ejs')
})

router.post('/inserted',(req,res)=>{    
    pool.getConnection((error,PoolConnection)=>{
        if (error) throw error
        let q = `INSERT INTO data (name,email) VALUES (${PoolConnection.escape(req.body.name)},${PoolConnection.escape(req.body.email)})`
        PoolConnection.query(q,((err)=>{
            if(err)  throw err
            return res.send(console.log('Created'));
        }))
        PoolConnection.release()
    })    
    res.redirect('/')
})


module.exports = router