require("dotenv/config");
const express = require("express");
const app = express();

const { PORT } = process.env;

app.get("/", (req, res) => {
  res.json({
    message: `Server is running on port ${PORT || 3000}`,
  });
});

app.listen(3434, () =>
  console.log(`Server is running on port ${PORT || 3000}`)
);
