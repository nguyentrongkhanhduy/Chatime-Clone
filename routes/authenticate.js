const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Driver = require("../models/Driver");

const deleteAllUser = async () => {
  await User.deleteMany();
  await Driver.deleteMany();
};

router.get("/authenticate", (req, res) => {
  // deleteAllUser();
  return res.render("authenticate.ejs", {
    same: false,
    created: false,
    wrong: false,
  });
});

router.post("/authenticate/owner", async (req, res) => {
  try {
    const { username, password } = req.body;
    const sameUser = await User.find({ username: username });
    if (sameUser.length !== 0) {
      return res.render("authenticate.ejs", {
        same: true,
        created: false,
        wrong: false,
      });
    }
    const newUser = await User.create({
      username: username,
      password: password,
      role: "owner",
    });
    return res.render("authenticate.ejs", {
      same: false,
      created: true,
      wrong: false,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/authenticate/driver", async (req, res) => {
  try {
    // console.log(req.body);

    const { username, password, fullName, vehicle, color, plate } = req.body;
    const sameUser = await User.find({ username: username });
    if (sameUser.length !== 0) {
      return res.render("authenticate.ejs", {
        same: true,
        created: false,
        wrong: false,
      });
    }
    const newUser = await User.create({
      username: username,
      password: password,
      role: "driver",
    });
    const newDriver = await Driver.create({
      username: username,
      password: password,
      name: fullName,
      vehicleModel: vehicle,
      color: color,
      plate: plate,
    });

    // console.log(newDriver);

    return res.render("authenticate.ejs", {
      same: false,
      created: true,
      wrong: false,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/authenticate/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await User.find({ username: username });
    if (existUser.length !== 0) {
      if (password === existUser[0].password) {
        req.session.isLoggedIn = true;
        if (existUser[0].role === "owner") {
          req.session.role = "owner";
        } else {
          const thisDriver = await Driver.find({ username: username });
          req.session.role = "driver";
          req.session.driver = thisDriver[0];
        }
        return res.redirect("/");
      } else {
        return res.render("authenticate.ejs", {
          same: false,
          created: false,
          wrong: true,
        });
      }
    } else {
      return res.render("authenticate.ejs", {
        same: false,
        created: false,
        wrong: true,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/authenticate/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

module.exports = router;
