
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");


const User=require("../models/user")
const express=require('express');



const authRouter=express.Router();
const {validateSignUpData}=require('../utils/validation');
const { UserAuth } = require('../Middlewares/auth');



//in this new fashion right way we first connect to db then listen at a specific port
//if db is not connected propery dont start server just show eroor in db
 authRouter.post("/signup",async (req,res)=>{    //add signup data to db post http method 
           
       //first thing that should happen when someone hits this api is
       //VALIDATION agar kuch galat hai yehi error throw kro

       try{


         validateSignUpData(req);

       const { firstName, lastName, emailId, password,gender } = req.body;

         const passwordHash=await bcrypt.hash(password,10);

         // console.log(passwordHash);



           const userObj={

           firstName,
           lastName,
           emailId,
           password:passwordHash,
           gender,
           }


              const user=new User(userObj);
        await user.save(); //this function return a promise thats why we use await here

        res.send("user added succesfully");

        }


          
          catch(err){
            return res.status(400).send("something went wrong :"+ err.message);
          }  
          
          //now encrypt the password then store in db







      //  console.log(req.body);  //req.body now has the object from the user input

      


         //this is hardcoded data right how can i make this dynamic as in for a user

      //        firstName:"Ms",
      //        lastName:"DHoni",
      //        emailId:"dhoni@123",
      //        password:"dhoni",
      //        age:43

        

        //craeting a new instance of user model
      //   try{
      //     const user=new User(userObj);
      //   await user.save(); //this function return a promise thats why we use await here

      //   res.send("user added succesfully");

      //   }
      //   catch(err){
      //     res.status(404).send("something went wrong"+err.message)
      //   }

      //   const user=new User(userObj);
      //   await user.save(); //this function return a promise

      //   res.send("user added succesfully");
 })


  //validate login privous was signup

 authRouter.post("/login",async(req,res)=>{

       try{


           //pehle jo passwrod dala hai wo correct bhi to hona chaiye

           const {emailId,password}=req.body;

            //check if user is present in the db or not

            const user=await User.findOne({emailId:emailId});

            if(!user){
                 throw new Error("Invalid credentials");
            }

           const isPasswordValid=await bcrypt.compare(password,user.password);

           if(isPasswordValid){
   
               //since password is correct here i will create token to cookie and send the response to user

              //  res.cookie("token","wakgfkgfvukqygfykagfkqgfkuqgfaqfkaquf"); //this is the token i am assigning to the user
               //for this token we will use jwt to give user the token 

               const token= await jwt.sign({_id:user._id},process.env.JWT_SECRET,{ expiresIn: '10h' });

               if(!token){
                 return res.status(401).send("please login !");
               }

              //  console.log(token);

               res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None"
});
 //jwt

               res.send(user);
           }

           else{
             throw new Error("Invalid credentials")
           }


       }

       catch(err){

           res.status(400).send("something went wrong :"+err.message);

       }

 })


 authRouter.post("/logout", UserAuth, async (req, res) => {
  res.cookie("token", "", {
  expires: new Date(0),
  httpOnly: true,
  secure: true,
  sameSite: "None"
});
// expire the cookie
  res.send(`${req.user.firstName} Logged out`);
});





module.exports = authRouter;