const socket= require('socket.io');


 const initializeSocket=(server)=>{
      
     
const io=socket(server,{
      
      cors:{
         
          origin:["http://localhost:5173","http://localhost:5174"],

      }
  });

  io.on("connection",(socket)=>{



        //handle events

        socket.on("joinChat",()=>{});

        socket.on("sendMessage",()=>{});

        socket.on("disconnect",()=>{});

  })
 }

 module.exports=initializeSocket;