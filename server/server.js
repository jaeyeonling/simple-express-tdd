const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const userRouter = require('../users/user.routers')

//
//
//

const server = express()

if (process.env.NODE_ENV !== 'test') {
  server.use(morgan('dev'))
}
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use('/users', userRouter)

//
//
//

module.exports = server
