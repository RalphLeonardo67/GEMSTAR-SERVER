const express = require("express");
const router = express.Router();
const { notificationController } = require("../controller");

router.get("/", (req, res) => {
  const { userId } = req.session;
  notificationController.fetchNotification(userId).then((response) => {
    res.send({ success: true, ...response });
  });
});

router.put("/dismiss", (req, res) => {
  const { notificationId } = req.body;
  const { userId } = req.session;
  notificationController
    .dismissNotification(notificationId, userId)
    .then((result) => {
      res.send(result);
    });
});

module.exports = router;
