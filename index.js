const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root route (health check)
app.get("/", (req, res) => {
  res.send("🚀 FanCity Backend API is running on Vercel!");
});



const basketballRoutes = require("./routes/basketballRoutes");

// ✅ Mount routes with prefixes

app.use("/api/basketball", basketballRoutes);

// ✅ Export app for Vercel (serverless)
module.exports = app;