const express = require("express");
const router = express.Router();

const Item = require("../models/MenuItem");

router.get("/", async (req, res) => {
  try {
    const listItem = await Item.find().sort({ name: 1 });
    const randomItem = listItem[Math.floor(Math.random() * listItem.length)];
    return res.status(200).render("menu.ejs", {
      currentRoute: "/menu",
      listItem: listItem,
      randomItem: randomItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/signature-milk-tea", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "signature-milk-tea" });
    const randomItem = listItem[Math.floor(Math.random() * listItem.length)];
    return res.render("menu.ejs", {
      currentRoute: "/signature-milk-tea",
      listItem: listItem,
      randomItem: randomItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/flavoured-milk-tea", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "flavoured-milk-tea" });
    const randomItem = listItem[Math.floor(Math.random() * listItem.length)];
    return res.render("menu.ejs", {
      currentRoute: "/flavoured-milk-tea",
      listItem: listItem,
      randomItem: randomItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/fruit-tea", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "fruit-tea" });
    const randomItem = listItem[Math.floor(Math.random() * listItem.length)];
    return res.render("menu.ejs", {
      currentRoute: "/fruit-tea",
      listItem: listItem,
      randomItem: randomItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/specialty-drinks", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "specialty-drinks" });
    const randomItem = listItem[Math.floor(Math.random() * listItem.length)];
    return res.render("menu.ejs", {
      currentRoute: "/specialty-drinks",
      listItem: listItem,
      randomItem: randomItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/jelly-and-juice", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "jelly-and-juice" });
    const randomItem = listItem[Math.floor(Math.random() * listItem.length)];
    return res.render("menu.ejs", {
      currentRoute: "/jelly-and-juice",
      listItem: listItem,
      randomItem: randomItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/matcha", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "matcha" });
    const randomItem = listItem[Math.floor(Math.random() * listItem.length)];
    return res.render("menu.ejs", {
      currentRoute: "/matcha",
      listItem: listItem,
      randomItem: randomItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/brown-sugar-pearls", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "brown-sugar-pearls" });
    const randomItem = listItem[Math.floor(Math.random() * listItem.length)];
    return res.render("menu.ejs", {
      currentRoute: "/brown-sugar-pearls",
      listItem: listItem,
      randomItem: randomItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/smoothie-&-slush", async (req, res) => {
  try {
    const listItem = await Item.find({ category: "smoothie-&-slush" });
    const randomItem = listItem[Math.floor(Math.random() * listItem.length)];
    return res.render("menu.ejs", {
      currentRoute: "/smoothie-&-slush",
      listItem: listItem,
      randomItem: randomItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const thisItem = await Item.find({ _id: req.params.id });
    // console.log(thisItem);

    if (thisItem.length !== 0) {
      const category = thisItem[0].category;
      const listItem = await Item.find({ category: category }).sort({
        name: 1,
      });
      return res.status(200).render("menu.ejs", {
        currentRoute: `/${category}`,
        listItem: listItem,
        randomItem: thisItem[0],
      });
    } else {
      return;
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
