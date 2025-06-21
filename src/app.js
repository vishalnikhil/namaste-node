

const express=require('express');

const app=express();

//middlewares-the funtions that we put in middle before the respone part are all
//come inside middlewares
//auth is also a middleware   

//impleted auth here right agar is route pe call aa rha h to pehle check kro if this req is actually send by admin
//do the user actually have that tocken if not sent an error write
//write a single auth for admin and for any admin related route first this auth middle ware will be checken only then the page will be loaded


// app.use("/admin",AdminAuth); //this is global auth middleware for all /admin route

     
 
  app.get("/admin",(req,res)=>{  //auth can also be placed here but since i have a global auth i dont need it 
    
   
   throw new Error("this is some eror ,sjbd"); //random error but it also exposes our code we will use error handler or try catch(always)
      
   res.send("all data sent");
  })

  app.use("/",(err,req,res,next)=>{    //error handler are placed at then end and you know why js is a syncronous single-threaded lang
           
      if(err){
           res.status(500).send("something went wrong");   //now code will not be exposed rather this response will be sent
      }
      
  })

  
//   app.get("/admin/deleteUser",AdminAuth,(req,res)=>{
//         res.send("User deleted");
//   })


  
   
   app.listen(7777,()=>{
     console.log("server started at port 7777")
});

//web server is created



