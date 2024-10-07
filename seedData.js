const mongoose = require("mongoose");
const item = require("./models/MenuItem");
require("dotenv").config();

const fs = require("fs").promises;
const filePath = "./milkTeaData.json";

const createData = async () => {
  try {
    await item.deleteMany();

    mongoose.connect(process.env.MONGODB_URI);

    const data = await fs.readFile(filePath, "utf8");
    const items = JSON.parse(data);

    await item.create(items);
  } catch (error) {
    console.log(error.message);
  }
  // finally {
  //   mongoose.disconnect();
  // }
};

module.exports = createData;
