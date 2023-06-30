const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
