
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = 1000

// Adding routes to server

const user = require('./routes/user')
const teaching = require('./routes/teaching')
const holiday = require('./routes/holiday')

const app = express()


app.use(bodyParser.json())

const db = "mongodb://localhost:27017/miniproject"


mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("mongodb connected"))
    .catch(err => console.log("mongodb connection err", err))

app.use('/user', user)
app.use('/teaching', teaching)
app.use('/holiday',holiday)

app.listen(PORT, () => console.log(`server running on port: ${PORT}`))