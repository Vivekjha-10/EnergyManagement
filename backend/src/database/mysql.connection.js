const mysql = require("mysql");
const util = require("util");
const config = require('../config/config');

// Mysql DB Config object
const con = mysql.createPool({
  host: config.db_mysql.host,
  port: config.db_mysql.port,
  database: config.db_mysql.dbname,
  user: config.db_mysql.user,
  password: config.db_mysql.password,
  connectionLimit: config.db_mysql.limit,
  timezone: config.db_mysql.timezone
});

con.getConnection((err, connection) => {
    if (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("Database connection was closed.");
      }
      if (err.code === "ER_CON_COUNT_ERROR") {
        console.error("Database has too many connections.");
      }
      if (err.code === "ECONNREFUSED") {
        console.error("Database connection was refused | Database port number is invalid.");
      }
      if (err.code === "ER_ACCESS_DENIED_ERROR") {
        console.error("Database connection was refused due to invalid password.");
      }
      if (err.code === "ER_BAD_DB_ERROR") {
        console.error("Database name is invalid.");
      }
      if (err.code === "ENOTFOUND") {
        console.error("Database hostname is invalid.");
      }
      if (err.code === "ER_NOT_SUPPORTED_AUTH_MODE") {
        console.error("Database username is invalid.");
      }
    }
    else{
      console.log("Successfully connected to Database !!");
    }
  
  if (connection) {
    connection.release();
  }
});

con.getConnection(err => {
  if (err) {
    console.log(err);
    console.log("Error in connecting to Database");
    return;
  }
    console.log("Connection established");
});

module.exports = {
  mysqlConnection: util.promisify(con.query).bind(con)
}
