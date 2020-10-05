const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstname: String,
  lastname: String,
  password: String,
  username: String,
  mobileno: String,
});

module.exports = mongoose.model("user", user);
