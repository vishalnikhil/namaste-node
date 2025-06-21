
const AdminAuth=(req,res,next)=>{
       
     const token="xy";  //this token can come from an actual api right

      if(token==="xyz"){
           next();
      }
                                                                                    
                                                                                      
           res.status(404).send("you are not a Admin MF")
      }

      module.exports={
        AdminAuth,
      }
       
      
  
