const mongoose = require("mongoose");
const item = require("../models/MenuItem");
require("dotenv").config({ path: "../.env" });

const createData = async () => {
  try {
    await item.deleteMany();

    mongoose.connect(process.env.MONGODB_URI);
    await item.create([
      {
        name: "Chatime Pearl Milk Tea",
        imgURL: "",
        description:
          "Tapioca pearls add a pleasant texture to our signature milk tea, a best-selling fan favourite. Have this drink made in your choice of Signature Milk Tea, Fresh Milk or Oat Milk.",
        price: 0,
        category: "signature milk tea",
      },
      {
        name: "Chocolate Malt Milk Tea",
        imgURL: "",
        description:
          "A sweet chocolate milk tea drink with subtle hints of malt",
        price: 0,
        category: "flavoured milk tea",
      },
      {
        name: "Grapefruit Tea",
        imgURL: "",
        description:
          "Our jasmine green tea with bold and tangy citrus grapefruit flavours",
        price: 0,
        category: "fruit tea",
      },
      {
        name: "Candied Winter Melon Iced tea",
        imgURL: "",
        description: "The perfect mix of sweet caramel notes as an iced tea",
        price: 0,
        category: "specialty drinks",
      },
      {
        name: "QQ Grapefruit",
        imgURL: "",
        description:
          "Our grapefruit juice has a tart citrus kick with a hint of sweetness. Topped with QQ, our topping that includes both our pearls and coconut jelly!",
        price: 0,
        category: "jelly and juice",
      },
      {
        name: "Matcha Latte",
        imgURL: "",
        description:
          "Earthy robust matcha tea mixed with your choice of milk for an added touch of richness",
        price: 0,
        category: "matcha",
      },
      {
        name: "Brown Sugar Pearls with Milk Tea",
        imgURL: "",
        description:
          "Our signature milk tea with the added richness of caramelized brown sugar pearls and topped with sea salt crema",
        price: 0,
        category: "brown sugar pearls",
      },
      {
        name: "Peach Slush",
        imgURL: "",
        description: "Thick, frosty, and peachy sweet",
        price: 0,
        category: "smoothie & slush",
      },
    ]);
  } catch (error) {
    console.log(error.message);
  }
  // finally {
  //   mongoose.disconnect();
  // }
};

module.exports = createData;
