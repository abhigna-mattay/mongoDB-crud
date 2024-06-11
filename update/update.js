//import modules
const express=require('express')
let mdb=require('mongodb')

const url=require('../url')
const router = require('../fetch/fetch')
let mcl=mdb.MongoClient 
let ruoter=express.Router()

router.put('/',(req,res)=>{
    let p_id=req.body.p_id 
    let obj={
        p_name : req.body.p_name,
        p_cost : req.body.p_cost
    }
    //connect to mongodb
    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log("error in connecting..")
        else {
            let db=conn.db('nodedb')
            db.collection('products').updateOne({p_id},{$set: obj},(err,result)=>{
                if(err)
                    res.json({"update":"error"+err})
                else {
                    if (result.matchedCount!=0){
                        console.log("data UPDATED")
                        res.json({"update":"success"})
                    }
                    else {
                        console.log("data NOT UPDATED")
                        res.json({"update":"record NOT FOUND"})
                        conn.close()
                    }
                }
            })
        }
    })
})

module.exports=router