const express = require("express");
const router = express.Router();

const Item = require("../models/MenuItem");
const Order = require("../models/Orders");

router.get("/start/:id/:ordered?", async (req, res) => {
  try {
    const thisItem = await Item.find({ _id: req.params.id });
    // console.log(thisItem[0]);
    if (thisItem.length !== 0) {
      if (req.params.ordered) {
      } else {
        return res.render("order.ejs", {
          orderingItem: thisItem[0],
          ordered: false,
          info: null,
          display: false,
        });
      }
    } else {
      return;
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/start/:id/:ordered?", async (req, res) => {
  try {
    if (req.params.ordered) {
      const thisItem = await Item.find({ _id: req.params.id });
      // console.log(thisItem[0]);
      if (thisItem.length !== 0) {
        if (req.params.ordered) {
          const name = req.body.name;
          const address = req.body.address;
          const phoneNumber = req.body.phoneNumber;
          const tip = parseInt(req.body.tip);

          const totalPaid =
            (thisItem[0].price * (tip / 100) + thisItem[0].price) * (13 / 100) +
            (thisItem[0].price * (tip / 100) + thisItem[0].price);

          console.log(thisItem[0]._id);

          const newOrder = await Order.create({
            cusName: name,
            phone: phoneNumber,
            deliAddress: address,
            itemOrdered: thisItem[0]._id,
            tip: `${req.body.tip}%`,
          });

          const obj = {
            odId: newOrder._id,
            name: name,
            address: address,
            phone: phoneNumber,
            paid: totalPaid.toFixed(2),
          };

          // console.log(obj);

          return res.render("order.ejs", {
            orderingItem: thisItem[0],
            ordered: true,
            info: obj,
            display: false,
          });
        } else {
        }
      } else {
        return;
      }
    } else {
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

const deleteAllOrder = async () => {
  try {
    await Order.deleteMany();
  } catch (error) {}
};

router.get("/check", (req, res) => {
  // deleteAllOrder();
  return res.render("order.ejs", {
    orderingItem: null,
    ordered: true,
    info: null,
    display: false,
  });
});

const testID = "6704a90353e6e68cb0d8a14a";

router.post("/check/order", async (req, res) => {
  try {
    const odID = req.body.odId;
    if (odID.length !== 24) {
      return res.render("order.ejs", {
        orderingItem: null,
        ordered: true,
        info: null,
        display: true,
      });
    }
    const yourOrder = await Order.find({ _id: odID });
    const itemOrdered = await Order.find({ _id: odID }).populate("itemOrdered");

    if (yourOrder.length !== 0) {
      // console.log(yourOrder[0]);
      // console.log(itemOrdered);

      const date = yourOrder[0].createdAt.toISOString().split("T")[0];
      const time = yourOrder[0].createdAt
        .toISOString()
        .split("T")[1]
        .split(".")[0];

      return res.render("order.ejs", {
        orderingItem: null,
        ordered: true,
        info: {
          order: itemOrdered[0],
          date: date,
          time: time,
        },
        display: true,
      });
    } else {
      return res.render("order.ejs", {
        orderingItem: null,
        ordered: true,
        info: null,
        display: true,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
