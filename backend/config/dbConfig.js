const mongoose = require("mongoose");

async function connectDB(url) {
  try {
    await mongoose.connect(url);
    console.log("Database is connected !!");
  } catch (e) {
    console.log("Error while connecting with DB.", e.message);
  }
}

module.exports = connectDB;