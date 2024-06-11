//import modules
const express=require('express')
let mdb=require('mongodb')

const url=require('../url')
const router = require('../fetch/fetch')
let mcl=mdb.MongoClient 
let ruoter=express.Router()

router.delete('/',(req,res)=>{ 
    let obj={
        p_id : req.body.p_id
    }
    //connect to mongodb
    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log("error in connecting..")
        else {

            let db=conn.db('nodedb')
            db.collection('products').deleteOne(obj,(err,result)=>{
                if(err)
                    res.json({"delete":"error"+err})
                else {
                    if (result.matchedCount!=0){
                        console.log("data DELETED")
                        res.json({"delete":"success"})
                    }
                    else {
                        console.log("data NOT DELETED")
                        res.json({"delete":"record NOT FOUND"})
                        conn.close()
                    }
                }
            })
        }
    })
})

module.exports=router