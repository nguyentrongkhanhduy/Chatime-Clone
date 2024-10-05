const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));

const port = process.env.PORT;
const databaseConnectString = process.env.MONGODB_URI;

const createData = require("./script/seedData");

const startServer = async () => {
  try {
    createData();
    await mongoose.connect(databaseConnectString);
    console.log("Database connected!");
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
};

app.listen(port, startServer);

app.get("/", (req, res) => {
  return res.render("home.ejs");
});

const menuRoutes = require("./routes/menu");

app.use("/menu", menuRoutes);
