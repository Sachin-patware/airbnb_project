const express = require("express");
const wrapAsync = require("../utility/wrapAsync.js");
const router = express.Router();
const google_login_Controller = require("../controller/google.jsx");

router.post("/auth/google", wrapAsync(google_login_Controller.google));

module.exports = router;
