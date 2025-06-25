
 const jwt=require("jsonwebtoken");

 const User=require("../models/user")
 //here will will read the token from req.cookies and then validate it after that we can use this function anywhere for authentication
 
 const UserAuth= async (req,res,next)=>{


       try{

        const cookies=req.cookies;

        const {token}=cookies;

        //now from the token we will get the id of the user using secret key

        const decoded_id= await jwt.verify(token,"Nikhil@143");

        const {_id}=decoded_id;

        const user=await  User.findById(_id);

        if(!user){
            throw new Error("user not found");
        }

        //yeh pahuche hai mtlb user mila gya hai to beeter rahega isko req mein attack kr do

            req.user=user;

        next(); //
     }
     catch(err){
            
           res.status(400).send("error :"+err.message);
     }





      
      
  }

  module.exports={

       UserAuth,

  }



    //    mongodb+srv://vishalnikhil2002:r0WDRAViC0OW3FA5@nikhilscluster.9mupdtd.mongodb.net/
      
  
