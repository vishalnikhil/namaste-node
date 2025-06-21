
const {AdminAuth}=require('./Middlewares/auth')
const express=require('express');

const app=express();

//middlewares-the funtions that we put in middle before the respone part are all
//come inside middlewares
//auth is also a middleware   

//impleted auth here right agar is route pe call aa rha h to pehle check kro if this req is actually send by admin
//do the user actually have that tocken if not sent an error write
//write a single auth for admin and for any admin related route first this auth middle ware will be checken only then the page will be loaded


app.use("/admin",AdminAuth); //this is global auth middleware for all /admin route

     
 
  app.get("/admin/getAlldata",AdminAuth,(req,res)=>{  //auth can also be placed here but since i have a global auth i dont need it 
        res.send("all data sent");
  })

  
  app.get("/admin/deleteUser",AdminAuth,(req,res)=>{
        res.send("User deleted");
  })


  
   
   app.listen(7777,()=>{
     console.log("server started at port 7777")
});

//web server is created



