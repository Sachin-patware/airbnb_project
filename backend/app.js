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
const MongoStore = require("connect-mongo");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const methodOverride = require("method-override");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// database connection');

// const mongo_url = "mongodb://127.0.0.1:27017/air_travles";
const mongo_url = process.env.ATLAS_URL;
async function connection() {
  await mongoose.connect(mongo_url);
}
connection()
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });

// session store
const store = MongoStore.create({
  mongoUrl: mongo_url,
  crypto: {
    secret: "MySecretCode",
  },
  touchAfter: 24 * 3600,
});
store.on("error", (e) => {
  console.log("Session store error", e);
});
const sessionOptions = {
  store: store,
  secret: "MySecretCode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    maxAge: 1 * 24 * 60 * 60 * 1000,
  },
  httpOnly: true,
};

app.use(methodOverride("X-HTTP-Method-Override"));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

let port = process.env.PORT || 5555;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://172.20.10.2:5173",
      "https://triphaven-o8qf.onrender.com",
    ],
    credentials: true,
  })
);

// Routes

app.use("/", userRouter);
app.use("/listing", listingRouter);

app.use("/listing/:id/reviews", reviewRouter);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found 😕"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = " try again Somthing went Wrong 😕!" } =
    err;
  res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log(`server at http://172.20.10.2:${port}`);
});
