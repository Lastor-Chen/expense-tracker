// App Server

// import package
// ==============================

// npm package
const express = require('express')                      // framework
const mongoose = require('mongoose')                    // mongoDB ODM
const exphbs = require('express-handlebars')            // template engine

const methodOverride = require('method-override')       // 控制 form method


// 環境 setting
// ==============================

const app = express()
const MONGODB_URL = process.env.MONGODB_URI || 'mongodb://localhost/record'
app.set('port', process.env.PORT || 3000)

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 設定模板引擎
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// 連接資料庫 mongoDB
mongoose.connect(MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)

const db = mongoose.connection
db.on('error', console.log.bind(console, 'mongoDB connection error.'))
db.once('open', console.log.bind(console, 'mongoDB is connected.'))


// route 設定
// ==============================

app.use('/records', require('./routes/record.js'))
app.use('/', require('./routes/home.js'))

// start server
// ==============================

app.listen(app.get('port'), () => {
  console.log(
    'Node.js Server with Express is running.',
    '\033[33m',
    `=> http://localhost:${app.get('port')}`,
    '\033[0m'
  )
})