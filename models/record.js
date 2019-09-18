// models record.js

// Model setting
// ==============================

const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})


// export
// ==============================

module.exports = mongoose.model('record', recordSchema)