const AppController = require("./app");
const AuthController = require("./auth");
const ServicesController = require("./services");
const projectController = require("./project");
const notificationController = require("./notification");

module.exports = {
  AppController,
  AuthController,
  notificationController,
  projectController,
  ServicesController,
};
