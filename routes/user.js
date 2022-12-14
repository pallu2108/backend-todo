const{Router}=require("express")
const {userModel}= require("../models/user.model")

const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userRoutes=Router()

userRoutes.get("/",(req,res)=>{
    res.send("This is homepage")
})
userRoutes.post("/signup",(req,res)=>{
    let{email,password}=req.body

    bcrypt.hash(password,6,async function(err,hash){
        if(err){
            res.send({"Error":"Something wrong"})
        }else{
            const newUser= new userModel({email,password:hash})
            await newUser.save()
            res.send({"message":"Succesfully Registered"})
        }
    })
})

userRoutes.post("/login",async(req,res)=>{
    let {email,password}= req.body
    let user = await userModel.findOne({email})
    let hash = user.password
    bcrypt.compare(password,hash,async function(err,result){
        if(user && result){
            var token = jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY);
            res.send({
                message:"Login Successful",
                token
            })

        }else{
            res.send({"Error":"Something Error"})
        }
    })
})

module.exports={
    userRoutes
}