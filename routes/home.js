// routes home.js

// import package
// ==============================

const express = require('express')
const router = express.Router()

const Recode = require('../models/record.js')
const lib = require('../lib/lib.js')

// routes '/'
// ==============================

router.get('/', (req, res) => res.redirect('/index'))

router.get('/index', (req,res) => {
  Recode.find({ userId: req.user.id }, (err, records) => {
    if (err) console.error(err)

    let sum = 0
    let times = 1
    for (const record of records) {
      // 取得 font-awesome icon 名稱
      record.iconName = lib.getCategoryIcon(record)

      // format Date { yyyy-mm-dd }
      record.showDate = record.date.toJSON().split('T')[0]

      // 加入奇數列 flag
      if (times % 2 === 1) { record.oddEven = 'odd'}
      
      // 計算總金額
      sum += record.amount

      times++
    }

    res.render('index', { css: 'index', js: 'index', records, sum })
  })
})


// export
// ==============================

module.exports = router