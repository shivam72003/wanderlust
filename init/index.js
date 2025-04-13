// const mongoose = require("mongoose");
// const Listing = require("../models/listing.js");
// const initdata = require("./data.js");

// ///////mongo

// MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   mongoose.connect(MONGO_URL);
// }

// let initializedata = async () => {
//  await Listing.deleteMany({});
//  initdata.data = initdata.data.map((obj) => ({...obj,owner:'67dd4b1b3c284047823553fa'}));
//   await Listing.insertMany(initdata.data);
//  await console.log("initial data is saved successfully");
// };


// initializedata();
