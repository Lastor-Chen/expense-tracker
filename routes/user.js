// routes user.js

// import package
// ==============================

const express = require('express')
const router = express.Router()


// routes '/users'
// ==============================

router.get('/signin', (req, res) => {
  res.render('signin', { css: 'sign' })
})

router.get('/signup', (req, res) => {
  res.render('signup', { css: 'sign'})
})

router.get('/signout', (req, res) => {
  res.send('sign out')
})

// export
// ==============================

module.exports = router