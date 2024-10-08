const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imgURL: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("MenuItem", itemSchema);

// ,
//     {
//         "name":"",
//         "imgURL": "",
//         "description":"",
//         "price":0,
//         "category":""
//     }
