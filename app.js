const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/db");
const authRoutes = require("./routes/auth");
const mealsRoutes = require("./routes/meals");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/meals", mealsRoutes);

connectDb();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
