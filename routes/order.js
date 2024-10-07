const express = require("express");
const router = express.Router();

const Item = require("../models/MenuItem");
const Order = require("../models/Orders");

router.get("/:id", async (req, res) => {
  try {
    const thisItem = await Item.find({ _id: req.params.id });
    console.log(thisItem[0]);
    if (thisItem.length !== 0) {
      return res.render("order.ejs", {
        orderingItem: thisItem[0],
      });
    } else {
      return;
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
