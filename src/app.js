const express=require('express');

const app=express();

  app.use('/test', (req,res)=>{
     res.send("hello form test sever");
  });
   app.use("/hello", (req,res)=>{
     res.send("hello form  hello server");
  });
  app.use("/an", (req,res)=>{
     res.send("hello form  ano server");
  });

app.listen(7777,()=>{
     console.log("server started at port 7777")
});

//web server is created



