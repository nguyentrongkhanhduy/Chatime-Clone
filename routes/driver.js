const express = require("express");
const router = express.Router();

const Driver = require("../models/Driver");
const Order = require("../models/Orders");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/");
    },
    filename: (req, file, cb) => {
        cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });


router.get("/", (req, res) => {
    return res.redirect("/driver/open-orders");
});

router.get("/open-orders", async (req, res) => {
    try {
        const orders = await Order.find({ status: "READY FOR DELIVERY" }).populate('itemOrdered');
        return res.render("driver.ejs", { session: req.session, currentPath: "/open-orders", orders: orders });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.get("/fulfillment", async (req, res) => {
    try {
        if (req.session.driver) {
            const orders = await Order.find({ deliverMan: req.session.driver._id, status: "IN TRANSIT" }).populate('itemOrdered');
            return res.render("driver.ejs", { session: req.session, currentPath: "/fulfillment", orders: orders});
        }
        else {
            return res.render("driver.ejs", { session: req.session, currentPath: "/fulfillment", orders: [] });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.post("/select/:id", async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {deliverMan: req.session.driver._id, status: "IN TRANSIT"});
        return res.redirect("/driver/open-orders");
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.post("/complete/:id", upload.single("userFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(500).send("ERROR: no file uploaded");
        }
        const publicPath = '/' + req.file.path.replace(/^public[\\/]/, '').replace(/\\/g, '/');
        const order = await Order.findByIdAndUpdate(req.params.id, {status: "DELIVERED", imgURL: publicPath});
        res.redirect("/driver/fulfillment");
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;