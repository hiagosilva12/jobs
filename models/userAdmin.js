const Sequelize = require("sequelize");
const db = require("../db/connection");

const User = db.define("user_admin", {
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
