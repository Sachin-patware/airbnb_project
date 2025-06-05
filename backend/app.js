const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./utility/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const methodOverride = require("method-override");
app.use(methodOverride("X-HTTP-Method-Override")); 

const sessionOptions = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    expires: Date.now() + 1* 24 * 60 * 60 * 1000,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  },
  httpOnly: true,
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

let port = 5555;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://172.20.10.2:5173"],
    credentials: true,
  })
);

const mongo_url = "mongodb://127.0.0.1:27017/air_travles";
async function connection() {
  await mongoose.connect(mongo_url);
}
connection()
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });


app.use("/", userRouter)
app.use("/listing", listingRouter);

app.use("/listing/:id/reviews", reviewRouter);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found 😕"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = " try again Somthing went Wrong 😕!" } = err;
  res.status(statusCode).send(message);
});

app.listen(port, "172.20.10.2", () => {
  console.log(`server at http://172.20.10.2:${port}`);
});
