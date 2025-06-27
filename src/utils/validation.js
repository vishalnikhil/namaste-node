
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

const validateEditprofileData=(req)=>{
      
        const allowedEdit=["firstName","lastName","emailId","about","skills"];


     const isEditAllowed = Object.keys(req.body).every((field) => {
    return allowedEdit.includes(field);
});



        if(!isEditAllowed){
            
              throw new Error("YOU CAN'T EDIT THIS");
        }  


        //edit is allowed

        //loop krle sare values ko update kro and 
        //then save it to db

        //req.body mein jo changes krna hai wo hai aur user mein sara original data hai db ka


       

   

}







module.exports={
    validateSignUpData,validateEditprofileData
}