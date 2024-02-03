const express = require("express");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const path = require("path");
const URL = require("./models/url");
const cors = require('cors');
const mongoose = require('mongoose');
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require ('cookie-parser');
const dotenv=require("dotenv");
const shortid = require("shortid");
//const connectDb = require("./connect");
dotenv.config()
const app = express();
//connectDb();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "urls",
 
})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Error connecting to database:', err));



// app.use(cors({
//   origin:'https://url-shortner-87nh.vercel.app',
//   credentials:true
// }));
// const corsConfig = {
//   allowedOrigins: 'https://url-shortner-one-ruddy.vercel.app',
 
// }
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))



//app.options("", cors(corsConfig))
app.use(express.json());//middleware
app.use("/url", urlRoute);
app.use("/user", userRoute);
app.get('/:id', async(req,res)=> {
  try{
    const tinyUrl = req.params.id;
  console.log(tinyUrl);
  const validUrl= await URL.findOne({shortId:tinyUrl})
  
    if(validUrl){
      const urlDoc = await URL.updateOne(
        { shortId: tinyUrl },
        { $push: { visitHistory: { timestamp: Date.now() } } }

      );
       res.set('Cache-Control', 'no-cache');
       res.redirect(validUrl.redirectURL)
    }
  
  }catch(err){
    // console.log(err);
    res.status(403).json({message:err})
  }
  
})




//paste the short id here
// app.get("/:shortId", async (req, res) => {
//   const shortId = req.params.shortId; // Given by the user
//   console.log('short is',shortId);
//   try {
//     res.redirect()
//   } catch (error) {
//     // Handle any potential errors
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.get("/", (req, res)=>{
  res.json('Server is Live');
})

// app.get('/:id', async(req,res)=> {
//   try{
//     const tinyUrl = req.params.id;
//   console.log(tinyUrl);
//   const validUrl= await URL.findOne({shortId:tinyUrl})
  
//     if(validUrl){
//       const urlDoc = await URL.updateOne(
//         { shortId: tinyUrl },
//         { $push: { visitHistory: { timestamp: Date.now() } } }
//       );
//        res.set('Cache-Control', 'no-cache');
//        res.redirect(validUrl.redirectUrl)
//     }
  
//   }catch(err){
//     // console.log(err);
//     res.status(403).json({message:err})
//   }
  
// })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ' +  port));

//VmvJAh6Efa8nyVWy