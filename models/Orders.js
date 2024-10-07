const mongoose = require("mongoose");

const MenuItem = require("./MenuItem");

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "READY FOR DELIVERY",
    },
    cusName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    deliAddress: {
      type: String,
      required: true,
    },
    itemOrdered: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    tip: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
