// routes home.js

// import package
// ==============================

const express = require('express')
const router = express.Router()
const Recode = require('../models/record.js')

// custom module
const { getCategoryIcon, getSelectList } = require('../models/category.js')

// routes '/'
// ==============================

router.get('/', (req, res) => res.redirect('/index'))

router.get('/index', (req,res) => {
  Recode.find({ userId: req.user.id }, (err, records) => {
    if (err) console.error(err)

    let totalAmount = 0
    let times = 1
    for (const record of records) {
      // 取得 font-awesome icon 名稱
      record.iconName = getCategoryIcon(record)

      // format Date { yyyy-mm-dd }
      record.showDate = record.date.toJSON().split('T')[0]

      // 加入奇數列 flag
      if (times % 2 === 1) { record.oddEven = 'odd'}

      // 計算總金額
      totalAmount += record.amount

      times++
    }

    // HTML select list 參照表
    const select = getSelectList()

    res.render('index', { css: 'index', js: 'index', select, records, totalAmount })
  })
})


// export
// ==============================

module.exports = router