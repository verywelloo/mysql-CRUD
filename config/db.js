const mysql = require("mysql2/promise"); // /promise for using promise with mysql in app.js

const mySqlPool = mysql.createPool({
  host: "bmg2bsd9sbiq4zriic4a-mysql.services.clever-cloud.com",
  user: "umaql09c0c7nv9bx",
  password: "srKHSDCKxy3JOI8gtJTY", // process.env.MYSQL_PASSWORD
  database: "bmg2bsd9sbiq4zriic4a",
});

module.exports = mySqlPool;
