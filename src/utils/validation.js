
const validator=require('validator');


//here i am handling all signup validation


const validateSignUpData=(req)=>{


       const {firstName,lastName,emailId,password}=req.body;

       if(!firstName || !lastName){
         throw new Error("name is not valid");
       }

      else if(!validator.isEmail(emailId)){
           throw new Error(" please enter a valid email")
      }

      else if(!validator.isStrongPassword(password)){
           throw new Error(" please enter a strong password")
      }

}

module.exports={
    validateSignUpData,
}