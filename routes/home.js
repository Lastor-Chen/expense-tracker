// routes home.js

// import package
// ==============================

const express = require('express')
const router = express.Router()

const Recode = require('../models/record.js')
const categoryMap = {
  '家居物業': 'home',
  '交通出行': 'shuttle-van',
  '休閒娛樂': 'grin-beam',
  '餐飲食品': 'utensils',
  '其他': 'pen'
}

// routes '/'
// ==============================

router.get('/', (req, res) => res.redirect('/index'))

router.get('/index', (req,res) => {
  Recode.find((err, records) => {
    if (err) console.error(err)

    records.forEach(record => {
      // 取得 category icon
      for (const key in categoryMap) {
        if (record.category === key) record.category = categoryMap[key]
      }
    })

    res.render('index', { css: 'index', records })
  })
})


// export
// ==============================

module.exports = router