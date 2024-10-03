const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      uniqure: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
    },
    color: {
      type: String,
    },
    plate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
