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


router.get('/update',(req,res)=>{
    pool.getConnection((err,PoolConnection)=>{
        if (err) throw err
        let q = `SELECT * FROM data WHERE id = ${PoolConnection.escape(req.query.id)}`
        PoolConnection.query(q,(error,rows,fields)=>{
            if (error) throw error            
            return res.render('../public/views/update.ejs', {data:rows[0]})
        })
        PoolConnection.release()
    })
})

router.post('/updated',(req,res)=>{
    pool.getConnection((err,PoolConnection)=>{
        if(err) throw err  
            let q = [`UPDATE data SET name = ${PoolConnection.escape(req.body.name)} WHERE id = ${PoolConnection.escape(req.body.id)}`,`UPDATE data SET email = ${PoolConnection.escape(req.body.email)} WHERE id = ${PoolConnection.escape(req.body.id)}`]
            //let q = `UPDATE data SET name = ${PoolConnection.escape(req.body.name)} WHERE id = ${PoolConnection.escape(req.body.id)}`
            PoolConnection.query(q.join(';'),(error,rows,fields)=>{
                if(error) throw error            
                res.redirect('/')
            })                  
        PoolConnection.release()
    })
})  


module.exports = router 