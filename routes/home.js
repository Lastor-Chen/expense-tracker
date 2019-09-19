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
  Recode.find((err, records) => {
    if (err) console.error(err)

    let times = 1
    for (const record of records) {
      // 取得 font-awesome icon 名稱
      record.iconName = lib.getCategoryIcon(record)

      // format Date { yyyy-mm-dd }
      record.showDate = record.date.toJSON().split('T')[0]

      // 加入奇數列 flag
      if (times % 2 === 1) { record.oddEven = 'odd'}
      
      times++
    }

    res.render('index', { css: 'index', js: 'index', records })
  })
})


// export
// ==============================

module.exports = router