const express = require("express");
const { connectToMongoDB } = require("./connect");
const path = require("path");
const URL = require("./models/url");


const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb+srv://sejal8974:VmvJAh6Efa8nyVWy@cluster0.arbfpo8.mongodb.net/?retryWrites=true&w=majority").then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());//middleware

app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/",  staticRoute);

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