let express=require('express')
let bodyparser=require("body-parser")
let cors=require('cors')

let app=express()

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended:false}))

//enable CORS --> Cross Origin Resource Sharing
app.use(cors())

let port = process.env.PORT || 8080
//import fetch insert update delete modules
let fetch = require('./fetch/fetch')
let insert = require('./insert/insert')
let update = require('./update/update')
let remov = require('./delete/delete')
//use above modules
app.use("/fetch", fetch)
app.use("/insert", insert)
app.use("/update", update)
app.use("/delete", remov)
//assign port no
app.listen(port, () => {
    console.log("Server listening port no:- ", port)
})
/*
    >node server
    Test following URLs with postman
    http://localhost:8080/fetch     (get)
    http://localhost:8080/insert    (post)
    http://localhost:8080/update    (put)
    http://localhost:8080/delete    (delete)
    body -> raw -> json
*/
