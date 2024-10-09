const express = require("express");
const router = express.Router();

const Item = require("../models/MenuItem");
const Order = require("../models/Orders");
const Driver = require("../models/Driver");

const checkLoggedIn = (req, res, next) => {
  if (
    req.session.hasOwnProperty("isLoggedIn") === true &&
    req.session.role === "owner"
  ) {
    next();
  } else {
    res.redirect("/");
  }
  // next();
};

router.get("/", checkLoggedIn, async (req, res) => {
  try {
    const listOrder = await Order.find()
      .populate("itemOrdered")
      .populate("deliverMan");
    // console.log(listOrder);
    return res.render("listOrder.ejs", {
      currentRoute: "/list",
      listOrder: listOrder,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/ready", checkLoggedIn, async (req, res) => {
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

router.get("/transit", checkLoggedIn, async (req, res) => {
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

router.get("/delivered", checkLoggedIn, async (req, res) => {
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

router.post("/checkcustomer", checkLoggedIn, async (req, res) => {
  try {
    const customerOrder = await Order.find({ cusName: req.body.name })
      .populate("itemOrdered")
      .populate("deliverMan");
    return res.render("listOrder.ejs", {
      currentRoute: "/checkcustomer",
      listOrder: customerOrder,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
