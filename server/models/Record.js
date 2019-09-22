const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: String
});

module.exports = Record = mongoose.model('records', RecordSchema);