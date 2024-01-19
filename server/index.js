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
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "urls",
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if server selection takes too long
})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Error connecting to database:', err));



// app.use(cors({
//   origin:'https://url-shortner-87nh.vercel.app',
//   credentials:true
// }));
const corsConfig = {
  allowedOrigins: 'https://url-shortner-one-ruddy.vercel.app',
 
}
app.use(cors(corsConfig))
//app.options("", cors(corsConfig))
app.use(express.json());//middleware

app.use("/url", urlRoute);
app.use("/user", userRoute);


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

app.get("/", (req, res)=>{
  res.json('Server is Live');
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ' +  port));

//VmvJAh6Efa8nyVWy