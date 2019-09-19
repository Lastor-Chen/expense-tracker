// routes user.js

// import package
// ==============================

const express = require('express')
const router = express.Router()
const passport = require('passport')


// routes '/auth'
// ==============================

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/index',
  failureRedirect: '/users/signin'
}))


// export
// ============================

module.exports = router