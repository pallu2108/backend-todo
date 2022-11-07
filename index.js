const express= require("express")
const{connection}= require("./config/db")
const {userRoutes}=require("./routes/user")
const {todoRoutes}=require("./routes/todo")
const {authentication}=require("./middlewares/authentication")

var cors = require('cors')
const app =express()

app.use(cors())
app.use(express.json())
app.use("/user",userRoutes)
app.use(authentication)
app.use("/todo",todoRoutes)
app.listen(8080,async()=>{
    try{
        await connection;
        console.log("Connected")
    }
    catch(err){
        console.log("Something err")
    }
    console.log("Started")
})