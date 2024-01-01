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
const dotenv=require("dotenv");
//const connectDb = require("./connect");
dotenv.config()
const app = express();
//connectDb();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "url" })
 .then(()=>console.log('database connected'))
 .catch((err)=>console.log(err))

// app.use(cors({
//   origin:'https://url-shortner-87nh.vercel.app',
//   credentials:true
// }));
const corsConfig = {
  origin: 'https://url-shortner-87nh.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
//app.options("", cors(corsConfig))
app.use(express.json());//middleware

app.use("/url",urlRoute);  
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute)
app.get("/",async (req,res)=>{
  res.send("server connected successfully");
})
//paste the short id here
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId; // Given by the user
  try {
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (entry) {
      // If an entry is found, send a JSON response with the redirect URL
      res.json({ redirectURL: entry.redirectURL });
    } else {
      // If no entry is found, send a JSON response indicating that the shortId is not valid
      res.status(404).json({ error: "ShortId not found" });
    }
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(process.env.PORT, () => console.log(`Server Started at PORT:${process.env.PORT}`));

//VmvJAh6Efa8nyVWy