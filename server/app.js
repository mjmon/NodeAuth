const express = require('express')
const morgan = require('morgan')
const uuid = require('uuid/v4')
const session = require('express-session')

const app = express()

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
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    console.log('Inside the homepage callback function')
    console.log(req.sessionID)
    res.send(`You hit home page!\n`)
})

app.listen(3000, () => {
    console.log('Listening on Port: 3000')
})