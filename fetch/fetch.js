//import modules
let express=require('express')
let mdb=require('mongodb')

//import url
const url=require('../url')

//create mongo client
let mcl=mdb.MongoClient

//create router instance
let router=express.Router()

//create rest API
router.get('/',(req,res)=>{
    //connect to mongodb
    mcl.connect(url,(err,connection)=>{
        if(err)
            console.log("Error in connecting...")
        else {
            console.log("connection made")
            let db=connection.db('nodedb')
            db.collection('products').find().toArray((err,array)=>{
                if(err)
                    console.log("Error:-",err)
                else {
                    console.log("Data Sent")
                    res.json(array)
                    connection.close()
                }
            })
        }

    })
})

module.exports=router