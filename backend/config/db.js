import mongoose from "mongoose";
require('dotenv').config();

const connectDB = async () => {
   await mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("DB Connected Successfully!!")
  })
  .catch((error)=>{
    console.log("DB Connection Failed!!")
    console.log(error);
  })
  
};


module.exports = connectDB;