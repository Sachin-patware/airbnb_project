const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

// connection 

const mongo_url = "mongodb://127.0.0.1:27017/air_travles";
async function connection() {
  await mongoose.connect(mongo_url);
}
connection()
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data)
    console.log('data was initialized');
    
}

initDB();