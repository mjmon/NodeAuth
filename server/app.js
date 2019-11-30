const express = require('express')
const morgan = require('morgan')
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')

const app = express()

//add & configure middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(session({
    genid: (req) => {
      console.log('Inside the session middleware')
      console.log(req.sessionID)
      const someid = uuid()
      console.log(`uuid generated: ${someid}`)
    //   return uuid() // use UUIDs for session IDs
      return someid
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//homepage route
app.get('/', (req, res) => {
    console.log('Inside the homepage callback function')
    console.log(req.sessionID)
    res.send(`You hit home page!\n`)
})

app.get('/login', (req, res) => {
  console.log('Inside GET /login callback function')
  console.log(req.sessionID)
  res.send('You got the login page!\n')
})

app.post('/login', (req, res) => {
  console.log('Inside POST /login callback function')
  console.log(req.body)
  res.send('You posted to the login page!\n')
})


app.listen(3000, () => {
    console.log('Listening on Port: 3000')
})