const mongoose =require('mongoose')
const dotenv=require("dotenv");
dotenv.config()
const connectDb= async()=>{
    try{
      mongoose.set("strictQuery", false);
         await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true,  })
        console.log('Connected to DB');
        
    }catch(err){
        console.log(err);
        
    }
}

module.exports=connectDb