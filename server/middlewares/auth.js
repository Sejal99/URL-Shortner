const { getUser } = require("../service/auth");
const jwt =require('jsonwebtoken')

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.headers.authorization;
console.log(userUid);
jwt.verify(userUid,process.env.SECRET,(err,payload)=>{
  if(err){
    return res.status(400).json(err)
  }
  req.user = payload; 
  next();
})
//   if (!userUid) return res.json('token not found');
//   const user = getUser(userUid);
//  console.log('user is',user);
//   if (!user) return res.json('not auth');

 

}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
