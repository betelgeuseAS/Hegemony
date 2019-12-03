const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  type: {
    type: String,
    required: true,
    default: 'text'
  },
  name: {
    type: String,
    required: true
  },
  content: String,
  tags: {
    type: [String],
    default: []
  },
  files: {
    type: [String],
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true //Automatically add two new fields - createdAt and updatedAt
});

module.exports = Record = mongoose.model('records', RecordSchema);
