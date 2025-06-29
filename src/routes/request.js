

const express=require('express');

const requestRouter=express.Router();
// const User=require("./models/user")
const {UserAuth}=require('../Middlewares/auth');

const ConnectionRequest=require('../models/connectionRequest');
const User = require('../models/user');



 requestRouter.post("/request/send/:status/:toUserId",UserAuth,async(req,res)=>{ //dynamic route is used here 
            
           
    try {


        const fromUserId=req.user._id;  //since i have called userAuth it will attack the user to the body

        const toUserId=req.params.toUserId; //parmas means dynamic route se hi iska value milega


        //the user that i am sending the request to should exist in my db right

        const ToUser = await User.findOne({ _id: toUserId });

        if(!ToUser){
             throw new Error("the user you are trying to send request does not exists");
        }

      if (fromUserId.toString() === toUserId.toString()) {
  throw new Error("You can't send a request to yourself");
}

        const status=req.params.status; //dynamic route

        //since this is a connection req the status can only be either intrested or rejected that is swiped left or right

        const allowedStatus=["interested","rejected"];

         let flag=false;

        for (let index = 0; index < allowedStatus.length; index++) {

              if(status==allowedStatus[index]){
                  flag=true;
              }

        }

        if(!flag){
           throw new Error("you cant have this status right now");
          
        }

     //    if(status!=="intrested" && status!=="rejected"){

     //           throw new Error("you cant have this status right now");
          
     //    }

     const existingConnectionRequest= await ConnectionRequest.findOne({

          //this is mongodb logic

          $or:[

             {fromUserId,toUserId},
             {fromUserId:toUserId,toUserId:fromUserId},  

          ]

          //in the schema level logic both ways checking is complex
          //this here checks for both ways


     });  


     if(existingConnectionRequest){


           throw new Error("The connection request already exits")
            
     }


        const connection=new ConnectionRequest({

             fromUserId,
             toUserId,
             status,

        });

        const data=await connection.save();

        
        res.json({

             message: `${req.user.firstName} sent a connection request to ${ToUser.firstName} successfully`,
             data,

        })


    } catch (err) {

//    if(err.code === 11000) {
//     return res.status(409).json({ message: "Request already exists between these users." });
//   }


         res.status(400).send("Error :"+err.message); 
        
    }



 })              

  requestRouter.post("/request/review/:status/:requestId",UserAuth,async(req,res)=>{ //here also dynamic route is used
         
     

     try {


           const loggedInUser=req.user; //userauth has attaccked it while finding

           //nikhil=>dhoni connection so dhoni should be logged in to accept or reject

           //the logged in user must have got the request
           //i.e loggedin user=to user id
           //status right now should only be interested
           //request id should be valid

            const {status,requestId}=req.params;

           const allowedStatus=["accepted","rejected"];

          

           if(!allowedStatus.includes(status)){
                 throw new Error("status is not allowed")
           }


           const connectionRequest=await ConnectionRequest.findOne({

                _id:requestId ,
                toUserId: loggedInUser._id,
                status:"interested",

           })


           if(!connectionRequest){
                throw new Error("this connection doest not exists");
           }


           //now i modify my status

           connectionRequest.status=status;

        const data =await connectionRequest.save();

        res.json({message:"connection request : "+status ,data});


     } 
     
     
     catch (err) {


           res.status(400).send("eror :" +err.message);
         

          
     }

   



         
  })

  
module.exports=requestRouter;
    