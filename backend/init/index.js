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
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"682769db3ab54393b7bbdfd1" })
    )
    await Listing.insertMany(initdata.data)
    console.log('data was initialized');
    
}

initDB();