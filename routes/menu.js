const express = require("express");
const router = express.Router();

const Item = require("../models/MenuItem");

router.get("/", async (req, res) => {
  try {
    const listItem = await Item.find();
    return res.status(200).render("menu.ejs", {
      currentRoute: "/menu",
      listItem: listItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/signature", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "signature milk tea" });
    return res.render("menu.ejs", {
      currentRoute: "/signature",
      listItem: listItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/flavoured", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "flavoured milk tea" });
    return res.render("menu.ejs", {
      currentRoute: "/flavoured",
      listItem: listItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/fruit", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "fruit tea" });
    return res.render("menu.ejs", {
      currentRoute: "/fruit",
      listItem: listItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/specialty", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "specialty drinks" });
    return res.render("menu.ejs", {
      currentRoute: "/specialty",
      listItem: listItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/jelly", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "jelly and juice" });
    return res.render("menu.ejs", {
      currentRoute: "/jelly",
      listItem: listItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/matcha", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "matcha" });
    return res.render("menu.ejs", {
      currentRoute: "/matcha",
      listItem: listItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/brown", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "brown sugar pearls" });
    return res.render("menu.ejs", {
      currentRoute: "/brown",
      listItem: listItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/smoothie", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "smoothie & slush" });
    return res.render("menu.ejs", {
      currentRoute: "/smoothie",
      listItem: listItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
