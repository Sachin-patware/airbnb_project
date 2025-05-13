const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./utility/ExpressError.js");
const listings = require("./routes/listing.js")
const reviews=require("./routes/review.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

let port = 5555;

app.use(
  cors({
    origin: "http://localhost:5173",
    origin: "http://172.20.10.2:5173",
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

app.get("/", (req, res) => {
  res.send("root");
});




app.use("/listing",listings);

app.use("/listing/:id/reviews",reviews);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found 😕"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Somthing went Wrong 😕!" } = err;
  res.status(statusCode).send(message);
});

app.listen(port,'172.20.10.2', () => {
  console.log(`server at http://172.20.10.2:${port}`);
});
