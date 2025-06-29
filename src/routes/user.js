const express=require('express');

const {UserAuth}=require('../Middlewares/auth')

const ConnectionRequest=require('../models/connectionRequest');
const { set } = require('mongoose');
const User = require('../models/user');

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

userRouter.get("/user/connection",UserAuth,async(req,res)=>{


      try {
          const loggedInUser=req.user;

      const connectionRequest=await ConnectionRequest.find({

           $or:[

            {toUserId:loggedInUser._id, status:"accepted"},
            { fromUserId:loggedInUser._id ,status:"accepted"}


           ],

      }).populate("fromUserId","firstName lastName age skills about gender")
      .populate("toUserId","firstName lastName age skills about gender")
      

        //abhi jo data mere ps aaya hai usme humko sab kuch display nhi krwana sirf imp chiz jaise name age 

        const data=connectionRequest.map((row)=>{  //yeh data dono se aa skta hai from ya to check krna parega n
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserIdl
            }

            return row.fromUserId;  
        });


      res.json({ message:"all connections fetched succesfully", data:data})

        
      } catch (err) {


            res.status(400).send("error " + err.message);
        
      }

    


})


//feed api
//this wont be easy

userRouter.get("/feed",UserAuth,async(req,res)=>{

          try {

            //user should see all other cards excpet his own card and the ones whom they are already connected or ignored o
            //the user should also not see the card of the people whom he has send request or recievd request from
             
            const loggedInUser=req.user;


             //now we need to find the card that we will not show to this user

             const connectionRequest=await ConnectionRequest.find({

                   $or :[
                     
                    {toUserId: loggedInUser._id},
                    {fromUserId: loggedInUser._id}

                   ]

              }).select("fromUserId toUserId") 
              // .populate("fromUserId","firstName").populate("toUserId", "firstName");

             //multiple bar aa gye hoge connection req mein
             //unique krne ke liye set me dalo

             const hideUserFromFeed=new Set();

             connectionRequest.forEach(req => {

                hideUserFromFeed.add(req.fromUserId);
                hideUserFromFeed.add(req.toUserId);

             });

             //hidden user mein wo sare users hai jisko hide krna hai feed se

             //abe sare user ko display kro jo db mein hai except those in the set

             const user= await User.find({


                 $and :[

                    {_id:{$nin:Array.from(hideUserFromFeed)}}, //this is mongodb quering

                    {_id:{$ne: loggedInUser._id}}, //agar set empty ho mtlb koi connection nhi tb yeh kam karega

                 ]
                  

             }).select("firstName lastName skills age about gender")
               


            //  console.log(user);

             res.json({message:`this is ${loggedInUser.firstName}'s feed`,user});

          
          }
     
          catch (err) {

              res.status(400).send("error :" + err.message);

            
          }

})


module.exports=userRouter;