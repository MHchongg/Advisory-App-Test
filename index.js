const express = require("express")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')

require('dotenv').config()

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', authRoutes)
app.use('/admin', adminRoutes)
app.use('/', userRoutes)

app.listen(8080, () => {
    console.log('server is running on port 8080')
});