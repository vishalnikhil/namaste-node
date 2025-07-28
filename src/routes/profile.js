
const express=require('express');

const profileRouter=express.Router();
// const User=require("./models/user")
const {UserAuth}=require('../Middlewares/auth');

const {validateEditprofileData}=require("../utils/validation")



 profileRouter.get("/profile",UserAuth,async(req,res)=>{ //aab agar auth sahi reha to next() call hoga warna yehi se error

      // const cookie=req.cookies;

      //  const {token}=cookie;

       //after login the cookie was craeted and now when api of get profile is 
       //called we will recieve the cookie from browser and now here we will validate out token


       //validate my token

      //  const decoded_id= await jwt.verify(token,"Nikhil@143") //using the secreted key you will get the user id of user which you hided 

      //  console.log(decoded_id);

      const user=req.user;

       


      res.send(user);
       

 })

 profileRouter.patch("/profile/edit",UserAuth,async(req,res)=>{


      //har chiz edit nhi krne dena hai userauth dal diya hai iska mtlb
      //user logged in hai and req mein user already added hai


      try{

          validateEditprofileData(req);

          //req.body mein jo changes krna hai wo hai aur user mein sara original data hai db ka

             const loggedInUser=req.user;
                
            //loop krke edit kro 

            Object.keys(req.body).forEach((key)=>{
                loggedInUser[key]=req.body[key];
            })

            await loggedInUser.save();

             res.send( `${loggedInUser.firstName},your profile was updated succesfully`)

      }

      catch(err){

           res.status(400).send("something went wrong" + err.message);
         
      }

 })

 profileRouter.patch("/profile/editpassword",UserAuth,async(req,res)=>{    //bad m bamayege



           //user auth added hai mtlb password jo dala tha wo sahi tha


           ///


           

 })



module.exports=profileRouter;
   