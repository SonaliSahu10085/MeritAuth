require("dotenv/config");
const express = require("express");
const connectDB = require("./config/dbConfig");

const app = express();
const { PORT, DB_URL } = process.env;

// Establishing the Database Connection
connectDB(DB_URL);

app.get("/", (req, res) => {
  res.json({
    message: `Server is running on port ${PORT || 3000}`,
  });
});

app.listen(3434, () =>
  console.log(`Server is running on port ${PORT || 3000}`)
);
