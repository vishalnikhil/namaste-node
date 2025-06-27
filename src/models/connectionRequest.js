

//this will have the schema for connection between the users
//aab yeh db mein store hoga as a connection
//hamko pta hoga kon kissse connected hai ya req bhej ahai ya ignore hua hai




const mongoose=require('mongoose');


const connectionRequestSchema=new mongoose.Schema({


     fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
         required:true
     },

     toUserId:{

        type: mongoose.Schema.Types.ObjectId,
           required:true
     },

     status:{

         type:String,
           required:true,

         //4 hi status ho skta hai connection ka isliye enum use kr rhe h
        
          //this is a validator we used in userSchema we can have use enum there as well
          enum :{

             values:["ignored","interested","accepted","rejected"],

             message:`{VALUE} is not accepted`

         }

     },

},{
    timestamps:true,
});


connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true }); //this wont allow same connection to send again and again both ways
//compound index



const ConnectionRequest=new mongoose.model("ConnectionRequest",connectionRequestSchema); //model is created here upar structure tha iska instance banega aab

module.exports=ConnectionRequest;
     
