// routes record.js

// import package
// ==============================

const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')


// routes '/record'
// ==============================

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const input = req.body
  console.log(input)

  Record.create(input, (err, record) => {
    if (err) console.error(err)
    res.redirect('/index')
  })
})

// export
// ==============================

module.exports = router