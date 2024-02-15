const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const router = require("./routers/pages")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('./db/connectdb')


app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, './public/user_profile_photos')))
app.use(express.static(path.join(__dirname, '../public/photos')))
app.use(express.static(path.join(__dirname, '../templates/views')))
app.use(express.static(path.join(__dirname, '../templates/partials')))
app.use(express.static(path.join(__dirname, '../src/middleware/auth')))
app.use(router);
app.use(cookieParser());


app.listen(8000, () => {
    console.log("Listening on port 8000.....")
})