const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/task"));

app.listen(5000, () => {
  console.log("Server running on port 5000 ");
});