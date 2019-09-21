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
  const month = req.query.month

  const query = { userId: req.user.id }
  if (month) { query["$where"] = `this.date.getMonth() === ${month - 1}` }

  Recode.find(query).sort({ date: -1 }).exec((err, records) => {
    if (err) return console.error(err)

    let totalAmount = 0
    let times = 1
    for (const record of records) {
      // 取得 font-awesome icon 名稱
      record.iconName = getCategoryIcon(record)

      // format Date { yyyy-mm-dd }
      record.showDate = record.date.toJSON().split('T')[0]

      // 加入奇數列 flag
      if (times % 2 === 1) { record.oddEven = 'odd' }

      // 計算總金額
      totalAmount += record.amount

      times++
    }

    // HTML select list 參照表
    const select = getSelectList()

    // 月份選單 [1..12]
    const monthList = [...Array(13).keys()].slice(1)

    res.render('index', { css: 'index', js: 'index', select, records, totalAmount, monthList, month })
  })  
})


// export
// ==============================

module.exports = router