// routes home.js

// import package
// ==============================

const express = require('express')
const router = express.Router()


// routes '/'
// ==============================

router.get('/', (req, res) => res.redirect('/index'))

router.get('/index', (req,res) => {
  res.render('index', { css: 'index' })
})


// export
// ==============================

module.exports = router