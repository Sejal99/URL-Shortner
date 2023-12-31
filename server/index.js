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
dotenv.config()
const app = express();
const PORT = 8001;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true,  })
 .then(()=>console.log('database connected'))
 .catch((err)=>console.log(err))
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));
app.use(express.json());//middleware

app.use("/url",urlRoute);   //only logged in user can access this
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute)

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

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

//VmvJAh6Efa8nyVWy