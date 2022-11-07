const {Router}=require("express")
const {todoModel}= require("../models/todo.model")

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const todoRoutes= Router()

todoRoutes.get("/",async(req,res)=>{
    let allTodo= await todoModel.find()

    res.send({"message":allTodo})
})

todoRoutes.post("/create",async(req,res)=>{
    let{taskname,status,tag,userId}=req.body

    let newTodo= new todoModel({
        userId,
        taskname,
        status,
        tag
    })
    await newTodo.save()
    res.send({"message":newTodo})

})

todoRoutes.delete("/delete/:_id",async(req,res)=>{
    let {_id}=req.params
    let {userId}= req.body
    let x = await todoModel.findOneAndDelete({
       _id,userId
    })
    if(x){
        res.send({"message":"deleted"})
    }else{
        res.send({"message":"You are not authorised"})
    }
})

todoRoutes.patch("/update/:_id",async(req,res)=>{
    let {userId}=req.body
    let{_id}=req.params
    let x = await todoModel.findOneAndUpdate({
        userId,_id},{...req.body})
        let updatedData= await todoModel.findOne({
            userId,_id
        })
    if(x){
        res.send({"message":updatedData})
    }else{
        res.send({"message":"not authorised"})
    }
})

module.exports={
    todoRoutes
}