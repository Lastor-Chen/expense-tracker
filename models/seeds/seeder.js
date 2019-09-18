// models/seeds seeder.js

// import package
// =========================

const mongoose = require('mongoose')

const Record = require('../record.js')
const records = require('./records.json')


// 主執行序
// =========================

const MONGODB_URL = process.env.MONGODB_URI || 'mongodb://localhost/record'

mongoose.connect(MONGODB_URL, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongoDB connection error.'))

db.once('open', async () => {
  console.log('\033[33m[seeder] mongoDB is connected')
  console.log('[seeder] Data is creating...\033[0m')

  for (const record of records) {
    await Record.create(record)
  }

  console.log('\033[32m[seeder] Sample docs are created from seeder\033[0m')
  process.exit()
})