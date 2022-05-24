const updateSet = {
  first_name: "first_name = ?",
  last_name: "last_name = ?",
  middle_name: "middle_name = ?",
  birthday: "birthday = ?",
  user_level_id: "user_level_id = ?",
  contact_number: "contact_number = ?",
  user_name: "user_name = ?",
  password: "password = ?",
  is_confirmed: "is_confirmed = ?",
  updated_at: "updated_at = ?",
  address: "address = ?",
};

const login = ({ email, password }) => {
  const query = `SELECT *
	FROM users
	WHERE (email = ? OR user_name = ?) AND password = ?`;
  return {
    sql: query,
    values: [email, email, password],
  };
};

const checkDuplicateEmail = (email) => {
  const query = `SELECT count(email) as count from users where email=?`;
  return {
    sql: query,
    values: [email],
  };
};

const register = ({
  usersId,
  firstName,
  middleName,
  lastName,
  birthDay,
  user_level_id,
  contact_number,
  address,
  email,
  userName,
  passwordHash,
}) => {
  const is_confirmed =
    process.env.IS_CONFIRMATION_NOT_REQUIRED === "TRUE" ? 1 : 0;
  const now = Date.now();
  const query = `
    INSERT INTO
    users(users_id, first_name, last_name, middle_name, birthday, user_level_id, email, user_name, password, is_confirmed, created_at, updated_at, address, contact_number)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  return {
    sql: query,
    values: [
      usersId,
      firstName,
      lastName,
      middleName,
      birthDay,
      user_level_id,
      email,
      userName,
      passwordHash,
      is_confirmed,
      now,
      now,
      address,
      contact_number,
    ],
  };
};

const update = (id, { fname, mname, lname, nname, bday }) => {
  const query = `UPDATE users
    SET first_name=?, last_name=?, middle_name=?, nick_name=?, birthday=?
    WHERE users_id=?`;
  return {
    sql: query,
    values: [fname, lname, mname, nname, bday, id],
  };
};

const getByEmail = (email) => {
  const query = `SELECT
  users_id, first_name, last_name, middle_name, birthday, user_level_name, user_level_acc, email, user_name, password, is_confirmed, address, contact_number
  FROM users
  LEFT JOIN user_level
  ON users.user_level_id = user_level.user_level_id
	WHERE email = ?`;
  return {
    sql: query,
    values: [email],
  };
};

const getByUsersId = (users_id) => {
  const query = `SELECT
  users_id, first_name, last_name, middle_name, birthday, user_level_name, user_level_acc, email, user_name, password, is_confirmed, address, contact_number
  FROM users
  LEFT JOIN user_level
  ON users.user_level_id = user_level.user_level_id
	WHERE users_id = ?`;
  return {
    sql: query,
    values: [users_id],
  };
};

const getByEmailOrUserName = (email) => {
  const query = `SELECT
  users_id, first_name, last_name, middle_name, birthday, user_level_name, user_level_acc, email, user_name, password, is_confirmed, address, contact_number
  FROM users
  LEFT JOIN user_level
  ON users.user_level_id = user_level.user_level_id
	WHERE email = ? OR user_name = ?`;
  return {
    sql: query,
    values: [email, email],
  };
};

const getAllEmployee = () => {
  const query = `SELECT * 
    FROM users
    WHERE user_level_id = ?`;
  return {
    sql: query,
    values: [2],
  };
};

const getAllUserLevel = () => {
  const query = `SELECT * FROM user_level`;
  return {
    sql: query,
    values: []
  };
};

const getUsersByUserLevel = (userLevel) => {
  const query = `SELECT users_id, first_name, last_name, middle_name, birthday, users.user_level_id, email, user_name, is_confirmed, address, contact_number,created_at, updated_at, user_level.user_level_name, user_level.user_level_acc
    FROM users
    LEFT JOIN user_level
    ON users.user_level_id = user_level.user_level_id
    WHERE user_level.user_level_id = ?`;
  return {
    sql: query,
    values: [userLevel],
  };
};

const getAllUsers = () => {
  const query = `SELECT users_id, first_name, last_name, middle_name, birthday, users.user_level_id, email, user_name, is_confirmed, address, contact_number, created_at, updated_at, user_level.user_level_name, user_level.user_level_acc
    FROM users
    LEFT JOIN user_level
    ON users.user_level_id = user_level.user_level_id `;
  return {
    sql: query,
    values: [],
  };
};

const dynamicUpdate = (usersId, fieldName, value) => {
  const query = `UPDATE users
    SET ${updateSet[fieldName]}
    WHERE users_id = ?`;
  return {
    sql: query,
    values: [value, usersId],
  };
};

module.exports = {
  dynamicUpdate,
  getAllEmployee,
  getAllUsers,
  getByEmail,
  getByEmailOrUserName,
  getByUsersId,
  getUsersByUserLevel,
  login,
  register,
  update,
  checkDuplicateEmail,
  getAllUserLevel 
};
