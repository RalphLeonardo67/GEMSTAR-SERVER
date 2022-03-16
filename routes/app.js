const express = require("express");
const router = express.Router();
const uploadCarousel = require("../helpers/uploadCarousel");
const { AppController } = require("../controller");

router.post(
  "/carousel/upload",
  uploadCarousel.single("file"),
  (req, res) => {}
);

router.get("/logs/fetch", (req, res) => {
  AppController.fetchLogs().then((response) => {
    res.send({ success: true, ...response });
  });
});

module.exports = router;
