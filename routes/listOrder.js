const express = require("express");
const router = express.Router();

const Item = require("../models/MenuItem");
const Order = require("../models/Orders");
const Driver = require("../models/Driver");

const checkLoggedIn = (req, res, next) => {
  if (req.session.hasOwnProperty("isLoggedIn") === true) {
    next();
  } else {
    res.redirect("/");
  }
};

router.get("/", async (req, res) => {
  try {
    const listOrder = await Order.find()
      .populate("itemOrdered")
      .populate("deliverMan");
    console.log(listOrder);
    return res.render("listOrder.ejs", {
      currentRoute: "/list",
      listOrder: listOrder,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/ready", async (req, res) => {
  try {
    const listOrder = await Order.find({
      status: "READY FOR DELIVERY",
    }).populate("itemOrdered");
    return res.render("listOrder.ejs", {
      currentRoute: "/ready",
      listOrder: listOrder,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/transit", async (req, res) => {
  try {
    const listOrder = await Order.find({
      status: "IN TRANSIT",
    })
      .populate("itemOrdered")
      .populate("deliverMan");
    return res.render("listOrder.ejs", {
      currentRoute: "/transit",
      listOrder: listOrder,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/delivered", async (req, res) => {
  try {
    const listOrder = await Order.find({
      status: "DELIVERED",
    })
      .populate("itemOrdered")
      .populate("deliverMan");
    return res.render("listOrder.ejs", {
      currentRoute: "/delivered",
      listOrder: listOrder,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
