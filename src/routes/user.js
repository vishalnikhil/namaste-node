const express=require('express');

const {UserAuth}=require('../Middlewares/auth')

const ConnectionRequest=require('../models/connectionRequest');

const userRouter=new express.Router();
//this api gets you all the prending connectionrequests for the logged in user
userRouter.get("/user/requests/recieved",UserAuth,async(req,res)=>{
    
      

      try {

        const loggedInUser=req.user;

         const connectionRequest=await ConnectionRequest.find({

            toUserId:loggedInUser._id, //sirf isko jo req aaya hai wo dikhao

            status:"interested",  //also sirf jo isme intrsted ho wo show kro

         }).populate("fromUserId","firstName lastName age photoUrl skills about");


         res.send(connectionRequest);


      }
      
     
      catch (err) {

          res.status(400).send("error :" +err.message);
        
      }
})


module.exports=userRouter;