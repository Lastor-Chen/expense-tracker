// routes home.js

// import package
// ==============================

const express = require('express')
const router = express.Router()

const Recode = require('../models/record.js')
// const records = require('../models/seeds/recode.json')
// const categoryMap = {
//   '家居物業': 'home',
//   '交通出行': 'shuttle-van',
//   '休閒娛樂': 'grin-beam',
//   '餐飲食品': 'utensils',
//   '其他': 'pen'
// }

// routes '/'
// ==============================

router.get('/', (req, res) => res.redirect('/index'))

router.get('/index', (req,res) => {
  Recode.find((err, records) => {
    if (err) console.error(err)
    console.log(records[0].date.toLocaleString())

    res.render('index', { css: 'index', records })
  })

  // records.forEach(record => {
  //   for (const cat in categoryMap) {
  //     if (record.category === cat) record.category = categoryMap[cat]
  //   }
  // })

})


// export
// ==============================

module.exports = router