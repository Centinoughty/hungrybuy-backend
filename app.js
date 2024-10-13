const express = require("express");
const { connectDb } = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

connectDb();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
