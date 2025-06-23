
const mongoose=require('mongoose');
// const { use } = require('react');

//this is schema for the user

const userSchema=new mongoose.Schema({


      firstName:{
        type:String,

        required:true
         

      },

      lastName:{

       type:String

      },

      emailId:{

             type:String,
             required:true,
             unique:true ,
             lowercase:true,
             trim:true
      },


    

      age:{
        type:Number,
        min:18,
        max:50
      },

       password:{
        type:String
      },

      photoUrl:{
        type:String
      },
      about:{

          type:String
         
      },

      skills : {
          type:Array

      },

      gender:{
        type:String,
        required:true,

          validate(value){
               if(value=="male" || value=="female" || value=="others"){  //yeh bydeafult sirf new data add krne pe hota hai to make it valid for
                                                                           //update part we need to add validate in update part 

                 
               }

               else{
                   throw new Error("gender data not valid");
                   
               }
          }
         
      }



},

{
     timestamps:true,  //it will track date and time by deafault for all user
}


);



const User=mongoose.model("User",userSchema)

module.exports=User

