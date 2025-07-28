//now we will use moongoose

const { default: mongoose } = require("mongoose")

const connectDB=async()=>{

  //  console.log(process.env.DB_CONNECTION_KEY)
     
  await mongoose.connect(
     process.env.DB_CONNECTION_KEY

  );
}

module.exports=connectDB;
