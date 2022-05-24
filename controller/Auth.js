const uuidv4 = require("uuid");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const { executeScript } = require("../model/mysql/utils");
const loginQuery = require("../model/mysql/query/auth");
const notificationController = require("./notification");

const getByEmail = () => {};

const login = ({ email, password }) => {
  return executeScript(loginQuery.getByEmailOrUserName(email))
    .then((results) => {
      if (results.length > 0) {
        return results[0];
      }
      throw new Error("Email does not Exist");
    })
    .then((results) => {
      return bcrypt
        .compare(password, decodeURIComponent(results.password))
        .then((success) => {
          if (success) {
            if (!!!results.is_confirmed) {
              throw new Error("Your Account is not yet confirmed");
            }
            const { password, ...rest } = results;
            return rest;
          } else {
            throw new Error("Incorrect Password");
          }
        });
    });
};

const checkDuplicateEmail = (email) => {
  return executeScript(loginQuery.checkDuplicateEmail(email)).then(
    (res) => res[0].count
  );
};

const register = (usersData) => {
  const usersId = uuidv4.v4();
  const passwordHash = encodeURIComponent(
    bcrypt.hashSync(usersData.password, salt)
  );
  usersData.passwordHash = passwordHash;

  return checkDuplicateEmail(usersData.email).then((ret) => {
    if (ret > 0) {
      throw new Error("Email Already Exist");
    }
    return executeScript(loginQuery.register({ ...usersData, usersId })).then(
      (result) => {
        notificationController.createNotification({
          url_link: `/users/manage/${usersId}`,
          template_name: "USER_REGISTRATION",
          notified_by: usersId,
          notified_users: ["1dfa4584-e597-4822-b065-e01ba29038dd"],
        });
        return result;
      }
    );
  });
};

const getUsersByUserLevel = (userLevel) => {
  return executeScript(loginQuery.getUsersByUserLevel(userLevel));
};

const getAllUsers = () => {
  return executeScript(loginQuery.getAllUsers());
};

const getAllUserLevel = () => {
  return executeScript(loginQuery.getAllUserLevel());
};

const dynamicUpdate = (usersId, fieldName, value) => {
  return executeScript(loginQuery.dynamicUpdate(usersId, fieldName, value));
};

const getByUsersId = (usersId) => {
  return executeScript(loginQuery.getByUsersId(usersId)).then((res) => res[0]);
};

module.exports = {
  dynamicUpdate,
  login,
  register,
  getAllUsers,
  getByEmail,
  getByUsersId,
  getUsersByUserLevel,
  getAllUserLevel
};
