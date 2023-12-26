const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
//const { setUser } = require("../service/auth");


// sign up route
async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
  
    try {
      // Create user
      const newUser = await User.create({
        name,
        email,
        password,
      });
  console.log("llllllll",newUser);
      // Instead of redirecting, send a JSON response with the newly created user data
      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error(error);
  
      // If there's an error, send a JSON response with an error message
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  



async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
