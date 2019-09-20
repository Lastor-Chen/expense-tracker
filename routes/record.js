// routes record.js

// import package
// ==============================

const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')

// custom module
const { categoryMap, getSelectList } = require('../models/category.js')
const { getOwnerId } = require('../models/lib/lib.js')


// routes '/record'
// ==============================

router.get('/new', (req, res) => {
  // HTML select list 參照表
  const select = getSelectList()

  res.render('newEdit', { js: 'newEdit',new: 'new', select })
})

router.post('/new', (req, res) => {
  const input = { ...req.body }
  input.userId = req.user.id

  Record.create(input, err => {
    if (err) return console.error(err)
    res.redirect('/index')
  })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  Record.findOne(getOwnerId(req), (err, record) => {
    if (err) return console.error(err)

    // 非擁有者時，導回首頁
    if (!record) return res.redirect('/index')

    // format date { yyyy-mm-dd }
    record.showDate = record.date.toJSON().split('T')[0]

    // HTML select list 參照表，依 record 標記 selected
    const select = getSelectList(record)
    
    res.render('newEdit', { js: 'newEdit',id, record, select })
  })
})

router.put('/:id/edit', (req, res) => {
  const input = req.body

  Record.findOne(getOwnerId(req), (err, record) => {
    if (err) return console.error(err)

    // 非擁有者時，導回首頁
    if (!record) return res.redirect('/index')

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

router.delete('/:id/delete', (req, res) => {
  Record.findOne(getOwnerId(req), (err, record) => {
    if (err) return console.error(err)

    // 非擁有者時，導回首頁
    if (!record) return res.redirect('/index')

    record.remove(err => {
      if (err) return console.error(err)
      res.redirect('/index')
    })
  })
})

// export
// ==============================

module.exports = router