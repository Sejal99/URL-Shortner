const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb+srv://sejal8974:VmvJAh6Efa8nyVWy@cluster0.arbfpo8.mongodb.net/?retryWrites=true&w=majority").then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());//middleware

app.use("/url", urlRoute);

//paste the short id here
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;  //given by the user
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
  res.redirect(entry.redirectURL);  // redirect to that page
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
//VmvJAh6Efa8nyVWy