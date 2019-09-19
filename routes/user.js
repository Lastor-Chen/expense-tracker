// routes user.js

// import package
// ==============================

const express = require('express')
const router = express.Router()


// routes '/users'
// ==============================

router.get('/signin', (req, res) => {
  res.send('sign in')
})

router.get('/signup', (req, res) => {
  res.send('sign up')
})

router.get('/signout', (req, res) => {
  res.send('sign out')
})

// export
// ==============================

module.exports = router