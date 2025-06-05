const express = require("express");
const router = express.Router();
const wrapAsync = require("../utility/wrapAsync.js");
const { userSchema } = require("../schemaValidation.js");
const UserController = require("../controller/user.jsx")


// validate ruser
const validateuser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    const messages = error.details.map((err) => err.message).join("\n");
    console.log(messages);

    return res.status(400).json({ error: messages });
  } else {
    next();
  }
};

router.post(
  "/signup",
  validateuser,
  wrapAsync(UserController.signup)
);

router.post("/login",UserController.login
);

router.get("/logout",UserController.logout );

router.get("/user", UserController.User);

module.exports = router;
