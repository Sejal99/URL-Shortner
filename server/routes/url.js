const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");
const URL = require("../models/url");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");

const router = express.Router();


router.get("/",restrictToLoggedinUserOnly,async(req,res)=>{
  try {
    console.log(req.user.id);
    const url=await URL.find({createdBy:req.user.id})
    res.json(url)
  } catch (error) {
    res.json(error)
  }
})
router.post("/",restrictToLoggedinUserOnly, handleGenerateNewShortURL);




router.get("/analytics/:shortId", handleGetAnalytics); // give which user visited how many times

module.exports = router;
