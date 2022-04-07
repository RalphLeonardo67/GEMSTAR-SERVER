const express = require("express");
const router = express.Router();
const { AuthController } = require("../controller");
const { loggerModule } = require("../middleware/accessControll");

router.get("/authenticated", (req, res) => {
  if (req.session.userId) {
    res.json({ success: true, user: req.session.user });
  } else {
    res.json({ success: false });
  }
});

router.post("/register", loggerModule("REGISTRATION"), (req, res) => {
  AuthController.register(req.body)
    .then(() => {
      res.send({ success: true });
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
});

router.put("/dynamic", loggerModule("EDIT_USER"), (req, res) => {
  const { fieldName, value, usersId } = req.body;
  const { userId } = req.session;

  AuthController.dynamicUpdate(usersId || userId, fieldName, value)
    .then(() => {
      res.send({ success: true });
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
});

router.post("/login", loggerModule("LOGIN"), (req, res) => {
  AuthController.login(req.body)
    .then((result) => {
      req.session.userId = result.users_id;
      req.session.user = result;
      res.send({ success: true, data: result });
    })
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
});

router.get("/employee", (req, res) => {
  const userLevel = process.env.EMPLOYEE_USER_LEVEL;
  AuthController.getUsersByUserLevel(userLevel).then((result) => {
    res.send({ success: true, data: result });
  });
});

router.get("/all", (req, res) => {
  AuthController.getAllUsers().then((result) => {
    res.send({ success: true, data: result });
  });
});

router.get("/logout", loggerModule("LOGOUT"), (req, res) => {
  req.session.destroy();
  res.send("logout");
});

router.get("/:usersId", (req, res) => {
  const { usersId } = req.params;
  AuthController.getByUsersId(usersId).then((result) => {
    res.send({ success: true, data: result });
  });
});

module.exports = router;
