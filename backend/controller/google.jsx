
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user.js");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports.google=async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const username = payload.name;

    const existingUser = await User.findOne({ email });
    

if (existingUser && !existingUser.googleLogin) {
  return res.status(400).json({
    error: "Email already exists. Use password login instead.",
  });
}


    let user = existingUser;

    if (!user) {
      user = new User({
        email,
        username,
        googleLogin: true, 
      });
      await user.save();
    }

    req.login(user, (err) => {
           console.error("req.login error:", err);
      if (err) return res.status(500).json({ error: "Login failed" });

      return res.status(200).json({
        message: "Google login successful",
        user: user.username,
        userid: user._id,
        email: user.email,
      });
    });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(401).json({ error: "Invalid Google token" });
  }
}