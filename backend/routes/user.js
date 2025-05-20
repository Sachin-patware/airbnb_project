const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utility/wrapAsync.js");
const passport = require("passport");

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newuser = new User({ email, username });
      let registeruser = await User.register(newuser, password);
      console.log("by registeruser",registeruser);
      req.logIn(registeruser, (err) => {
        if (err) {

          return next(err);
        }
        return res.status(200).json({
          message: "user SignUp successfully ",
          user: registeruser.username,
          userid:registeruser._id,
        });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    const redirectUrl = req.session.redirectUrl;
    
    
    delete req.session.redirectUrl;
    if (err) return next(err);
    if (!user) {
      console.log(info);
      return res
        .status(401)
        .json({ error: info?.message || "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log("user detail using req=",req.user);

      return res
        .status(200)
        .json({
          message: "User login successful",
          user: req.user.username,
          userid:req.user._id,
          url:redirectUrl,
        });
    });
  })(req, res, next);
});

router.get("/logout", async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    return res
      .status(200)
      .json({ message: "User logout successful", user: req.user });
  });
});

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user.username ,userid:req.user._id, });
  }
  res.status(401).json({ user: null , userid:"null",});
});

module.exports = router;
