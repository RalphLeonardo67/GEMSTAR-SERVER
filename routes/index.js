const express = require("express");
const router = express.Router();

const auth = require("./auth");
const services = require("./services");
const project = require("./project");
const app = require("./app");
const notification = require("./notification");

router.use("/app", app);
router.use("/auth", auth);
router.use("/services", services);
router.use("/project", project);
router.use("/notif", notification);
router.use("/notif", notification);

module.exports = router;
