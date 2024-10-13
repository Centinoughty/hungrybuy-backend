const express = require("express");
const { connectDb } = require("./config/db");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

connectDb();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
