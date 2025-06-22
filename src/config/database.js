//now we will use moongoose

const { default: mongoose } = require("mongoose")

const connectDB=async()=>{
     
  await mongoose.connect(
  "mongodb+srv://vishalnikhil2002:r0WDRAViC0OW3FA5@nikhilscluster.9mupdtd.mongodb.net/devTinder?retryWrites=true&w=majority"
);

}

module.exports=connectDB;
