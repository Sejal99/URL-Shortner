const jwt=require("jsonwebtoken");
const secret="1234";


//this func will make tokens
function setUser(user){

return jwt.sign({
    _id:user._id,
    email:user.email,
},secret);  
}

function getUser(token){
    try {
        return jwt.verify(token,secret);
    } catch (error) {
        if(!token) return null;
    }
  

}


module.exports={
    setUser,
    getUser,
};