const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const WrapAsync= require("./utility/wrapAsync.js")
const ExpressError = require("./utility/ExpressError.js")
const {listingSchema}= require("./schemaValidation.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));


let port = 5555;

app.use(cors({
  origin: "http://localhost:5173"
}));


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


// show all listing
app.get("/listing",WrapAsync( async (req, res) => {
    try {
       const alllistings = await Listing.find({});
       await res.json(alllistings);

    } catch (err) {
       res.status(500).json({ error: "Server error" });
    }
 }));
// view details of listing
 app.get("/listing/:id",WrapAsync( async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.json(listing);
  
}));

// create new
app.post("/listing",WrapAsync( async(req , res)=>{
  const { error, value } = listingSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map(err => err.message).join("\n");
    console.log(messages);
    
    return res.status(400).json({ error: messages });
  }
  const newListing = new Listing(value.listing);
  console.log(newListing);
  await newListing.save();

  res.status(200).json({ message: 'Listing created successfully :)' });
}));

// update 
app.put("/listing/:id",WrapAsync( async (req, res) => {
  const { id } = req.params;
  console.log(id,"update succesfuly");

  try {

    const { error} = listingSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map(err => err.message).join("\n");
    console.log(messages);
    
    return res.status(400).json({ error: messages });
  }
   await Listing.findByIdAndUpdate(id, req.body.listing,{
    runValidators:true}
   );
    res.status(200).json({ message: 'Listing update successfully' });
  }
   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong ❌' });
  }

}));

app.delete("/listing/:id",WrapAsync( async (req, res) => {
  const { id } = req.params;

  try {
    const listingDelete = await Listing.findByIdAndDelete(id);

    console.log(listingDelete);
    res.status(200).send("Successfully deleted");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send("Error deleting listing");
  }
}));

app.use( (req, res, next) => {
  next(new ExpressError(404, "Page Not Found 😕"));
});

app.use((err, req, res , next)=>{
  let{statusCode=500,message="Somthing went Wrong !"}=err;
  res.status(statusCode).send(message);
});


app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
