// routes record.js

// import package
// ==============================

const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')

const { categoryMap } = require('../lib/lib.js')

// routes '/record'
// ==============================

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const input = req.body
  
  Record.create(input, err => {
    if (err) return console.error(err)
    res.redirect('/index')
  })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  Record.findOne({ _id: id }, (err, record) => {
    if (err) return console.error(err)

    // format date { yyyy-mm-dd }
    record.showDate = record.date.toJSON().split('T')[0]

    // 製作 category 之 HTML select，找出 selected 上 flag
    // @select { Array } [{ category: "String", selected: Boolean }, ...]
    const select = []
    Object.keys(categoryMap).forEach(name => {
      const obj = { category: name }
      if (name === record.category) { obj.selected = true } 
      
      select.push(obj)
    })
    
    res.render('edit', { id, record, select })
  })
})

router.put('/:id/edit', (req, res) => {
  const input = req.body

  Record.findOne({ _id: req.params.id }, (err, record) => {
    if (err) return console.error(err)

    // 將 user input 回存
    for (const key in input) {
      record[key] = input[key]
    }

    record.save(err => {
      if (err) return console.error(err)
      res.redirect('/index')
    })
  })
})

// export
// ==============================

module.exports = router