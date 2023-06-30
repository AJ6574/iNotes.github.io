const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  UserID: {
    type: String,
    require: true,
  },
  Title: {
    type: String,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const note = mongoose.model("note", noteSchema);

module.exports = note;
