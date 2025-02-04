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

const session = require("express-session");
app.use(
  session({
    secret: "the final project for course MADS4012", // random string, used for configuring the session
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

const createData = require("./seedData");

const startServer = async () => {
  try {
    // createData();
    await mongoose.connect(databaseConnectString);
    console.log("Database connected!");
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
};

app.listen(port, startServer);

app.get("/", (req, res) => {
  if (req.session.hasOwnProperty("isLoggedIn") === true) {
    if (req.session.role === "owner") {
      return res.redirect("/list");
    } else {
      return res.redirect("/driver");
    }
  }
  return res.render("home.ejs");
});

const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/order");
const authenticateRoutes = require("./routes/authenticate");
const listOrderRoutes = require("./routes/listOrder");
const driverRoutes = require("./routes/driver");

app.use("/menu", menuRoutes);
app.use("/order", orderRoutes);
app.use("/", authenticateRoutes);
app.use("/list", listOrderRoutes);
app.use("/driver", driverRoutes);
