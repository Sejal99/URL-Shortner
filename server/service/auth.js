const jwt=require("jsonwebtoken");



//this func will make tokens
function setUser(user){

return jwt.sign({
    id:user._id,
    email:user.email,
},process.env.SECRET);  
}

function getUser(token){
    try {
        return jwt.verify(token,process.env.SECRET);
    } catch (error) {
        if(!token) return null;
    }
  

}


module.exports={
    
    setUser,
    getUser,
};