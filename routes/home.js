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

    for (const record of records) {
      // 取得 font-awesome icon 名稱
      lib.getCategoryIcon(record)

      // format Date
      record.showDate = record.date.toLocaleDateString('zh-tw')
    }
    
    res.render('index', { css: 'index', records })
  })
})


// export
// ==============================

module.exports = router