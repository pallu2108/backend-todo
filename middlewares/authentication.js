const jwt = require('jsonwebtoken')
require('dotenv').config()
const authentication=(req,res,next)=>{
    const token= req.headers?.authorization?.split(" ")[1]

    jwt.verify(token,process.env.JWT_SECRET_KEY,async function(err,decoded){
        if(err){
            res.send({"Error":"Something error"})
        }else{
            req.body.userId=decoded.userId
            next()
        }
    })
}

module.exports={
    authentication
}