

const express=require('express');

const requestRouter=express.Router();
// const User=require("./models/user")
const {UserAuth}=require('../Middlewares/auth');



 requestRouter.post("/sendConnection",UserAuth,async(req,res)=>{


       //aab koi connect send kr rha hai to logged in bhi hoga mtlb auth call karna parega
       //aur auth call hua to user bhi store ho gya hoga req mein

       res.send(req.user.firstName +": sent the connection req sent");

        
         
   })




module.exports=requestRouter;
    