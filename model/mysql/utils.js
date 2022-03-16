const db = require("./config");

const executeScript = (query) => {
  return db
    .then((conn) => conn.query(query))
    .then((value) => {
      return value;
    });
};

module.exports = {
  executeScript,
};
