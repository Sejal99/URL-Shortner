const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized", message: "User not logged in" });
    }
  
    try {
      const allUrls = await URL.find({ createdBy: req.user._id });
      return res.json({ urls: allUrls });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  

router.get("/signup", (req, res) => {
    return res.json({ message: "Render your signup form here if needed in the frontend" });
});

router.get("/login", (req, res) => {
    return res.json({ message: "Render your signup form here if needed in the frontend" });
});

module.exports = router;
