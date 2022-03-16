const mysql = require("promise-mysql");
const chalk = require("chalk");

const pool = mysql
  .createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .then((conn) => {
    console.log(chalk.green("MYSQL database connected"));
    return conn;
  })
  .catch((err) => {
    console.log(err);
    console.error(chalk.red("MYSQL database connection error"));
  });

module.exports = pool;
