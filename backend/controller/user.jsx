const verifyEmail = require("../utility/verifyEmail.js");
const User = require("../models/user.js");
const passport = require("passport");

module.exports.signup=async (req, res) => {
    try {
      let { username, email, password } = req.body;
    
     const { isValid, status, error: verifyError } = await verifyEmail(email);

    if (!isValid) {
      return res.status(400).json({
        error: `That email doesn’t seem valid. Status: ${status}`,
        detail: verifyError || "Email verification failed",
      });
    }
  // Register a user 
      const newuser = new User({ email, username });
      let registeruser = await User.register(newuser, password);
      console.log("registeruser ==", registeruser);

       // Auto-login the user
      req.logIn(registeruser, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          message: "user SignUp successfully ",
          user: registeruser.username,
          userid: registeruser._id,
          email:registeruser.email,
        });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

//   login
module.exports.login=  (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    
    if (err) return next(err);
    if (!user) {
      console.log(info);
      return res
        .status(401)
        .json({ error: info?.message || "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log("user detail using req on login=", req.user);

      return res.status(200).json({
        message: "User login successful",
        user: req.user.username,
        userid: req.user._id,
        email: req.user.email,
      });
    });
  })(req, res, next);
}

// logout
module.exports.logout=async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    return res
      .status(200)
      .json({ message: "User logout successful"});
  });
}

// user

module.exports.User=async(req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user.username, userid: req.user._id, email:req.user.email  });
  }
  res.status(401).json({ user: null, userid: "null" });
}