const mongoose = require('mongoose');

async function iNotes_database() {
  await mongoose.connect(process.env.DB_URI);
  console.log("Connection to iNotes database is successful.")
}

module.exports = iNotes_database