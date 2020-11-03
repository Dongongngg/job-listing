const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const jobs = require("./routes/jobs");
const users = require("./routes/users");

const app = express();

app.use(express.json());

//routes
app.use("/api/jobs", jobs);
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.listen(
  5000,
  console.log(
    `server is running on ${MODE} mode, and is listening on port ${PORT}`
  )
);
