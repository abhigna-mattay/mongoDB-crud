//import modules
const express=require('express')
let mdb=require('mongodb')

const url=require('../url')
const router = require('../fetch/fetch')
let mcl=mdb.MongoClient 
let ruoter=express.Router()

router.post('/',(req,res)=>{
    let obj=req.body
    //connect to mongodb
    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log("error in connecting..")
        else {
            let db=conn.db('nodedb')
            db.collection('products').insertOne(obj,(err)=>{
                if(err)
                    console.log("error:",err)
                else {
                    console.log("Data is INSERTED")
                    res.json({"insert" : "success"})
                    conn.close()
                }
            })
        }
    })
})

module.exports=router