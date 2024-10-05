const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: false,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("Item", itemSchema);

// ,
//     {
//         "name":"",
//         "imgURL": "",
//         "description":"",
//         "price":0,
//         "category":""
//     }
