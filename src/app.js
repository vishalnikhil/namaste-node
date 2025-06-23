
require('./config/database')
const express=require('express');
const connectDB=require('./config/database')
const app=express();

const bcrypt = require('bcrypt');

const User=require("./models/user")

const {validateSignUpData}=require('./utils/validation')

app.use(express.json()); //this is a middleware for json data conversion


//in this new fashion right way we first connect to db then listen at a specific port
//if db is not connected propery dont start server just show eroor in db
 app.post("/signup",async (req,res)=>{    //add signup data to db post http method 
           
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

 app.post("/login",async(req,res)=>{

       try{


           //pehle jo passwrod dala hai wo correct bhi to hona chaiye

           const {emailId,password}=req.body;

            //check if user is present in the db or not

            const user=await User.findOne({emailId:emailId});

            if(!user){
                 throw new Error("email id is not present in db");
            }



           const isPasswordValid=await bcrypt.compare(password,user.password);

           if(isPasswordValid){
               res.send("login succesfull");
           }

           else{
             throw new Error("please enter the correct password")
           }


       }

       catch(err){

           res.status(400).send("something went wrong :"+err.message);

       }

 })





 //GET user by email
  app.get("/user",async(req,res)=>{
        
       const email=req.body.emailId;

       try{
          const user=await User.find({emailId:email}) //you should never allow 2 users with same email right

            res.send(user);

       }
         catch(err){
          res.status(404).send("something went wrong"+err.message)
        }

       //how will i find the user with  email

  



  })
 
 //i need to craete the feed api it gets the data from database and use it to show feeds 
  app.get("/feed",async(req,res)=>{

        //to get data from db you need to know what will you get from the db   (MODEL)

         //we use model to find data in db

        

         try{

             const users=await User.find({});  //since this is an empty object so it will return all the data in our database

             res.send(users);

         }
            catch(err){
          res.status(404).send("something went wrong"+err.message)
        }




       
   })

   
   //delete any user
   app.delete("/user",async(req,res)=>{
         
        const userId=req.body.userId;

        try{

             const user=await User.findByIdAndDelete(userId);

             res.send("user deleted succesfully");

        }
          catch(err){
          res.status(404).send("something went wrong"+err.message)
        }
   })

   //how to write api to updte patch put  yad karo diff btwn patch and put

   app.patch("/user",async(req,res)=>{

         const data=req.body;
         const userId=req.body.userId;

         // console.log(data);
         //if you are trying to update something that is not present in the schema then nothing will happen 
         //it ignore all other data that are not in schema


         try{

             await User.findByIdAndUpdate({_id:userId},data,{runValidators:true}); //there is a extra parameter options which is passed as object

             res.send("user updated succesfully");

           

         }

          catch(err){
            res.status(400).send("something went wrong"+err.message);
        }
       

   })



connectDB()

.then(()=>{
   console.log("data connected succesfully");
      app.listen(7777,()=>{
     console.log("server started at port 7777")
});


})
 .catch((err)=>{
   console.log("database cannot be connected");
 });

//middlewares-the funtions that we put in middle before the respone part are all
//come inside middlewares
//auth is also a middleware   

//impleted auth here right agar is route pe call aa rha h to pehle check kro if this req is actually send by admin
//do the user actually have that tocken if not sent an error write
//write a single auth for admin and for any admin related route first this auth middle ware will be checken only then the page will be loaded 


// app.use("/admin",AdminAuth); //this is global auth middleware for all /admin route

     
 
//   app.get("/admin",(req,res)=>{ //auth can also be placed here but since i have a global auth i dont need it 
    
//    try{
//        throw new Error("this is some eror"); 
      
//    res.send("all data sent");

//    }
//    //this is proper way of handling error try catch and for safety just place the error handling at then end of your code

//    catch(err){
//       res.status(500).send("something went wrong");

//    }
   // throw new Error("this is some eror"); //random error but it also exposes our code we will use error handler or try catch(always)
      
   // res.send("all data sent");
//   })

//   app.use("/",(err,req,res,next)=>{    //error handler are placed at then end and you know why js is a syncronous single-threaded lang
           
//       if(err){
//            res.status(500).send("something went wrong");   //now code will not be exposed rather this response will be sent
//       }
      
//   })

  
//   app.get("/admin/deleteUser",AdminAuth,(req,res)=>{
//         res.send("User deleted");
//   })


  
   

//web server is created



