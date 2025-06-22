
require('./config/database')
const express=require('express');
const connectDB=require('./config/database')
const app=express();

const User=require("./models/user")


//in this new fashion right way we first connect to db then listen at a specific port
//if db is not connected propery dont start server just show eroor in db
 app.post("/signup",async (req,res)=>{   //add signup data to db post http method
           
        const userObj={

             firstName:"Ms",
             lastName:"DHoni",
             emailId:"dhoni@123",
             password:"dhoni",
             age:43

        }

        //craeting a new instance of user model


        try{
          const user=new User(userObj);
        await user.save(); //this function return a promise

        res.send("user added succesfully");

        }
        catch(err){
          res.status(404).send("something went wrong")
        }

      //   const user=new User(userObj);
      //   await user.save(); //this function return a promise

      //   res.send("user added succesfully");
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



