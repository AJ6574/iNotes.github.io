const mongoose = require('mongoose');

async function iNotes_database() {
  await mongoose.connect('mongodb://127.0.0.1:27017/iNotes');
  console.log("Connection to iNotes database is successful.")
}

module.exports = iNotes_database