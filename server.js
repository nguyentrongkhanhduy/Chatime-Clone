const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
const databaseConnectString = process.env.MONGODB_URI;

const startServer = async () => {
  try {
    await mongoose.connect(databaseConnectString);
    console.log("Database connected!");
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
};

app.listen(port, startServer);

app.get("/", (req, res) => {
  return res.send("Welcome");
});
