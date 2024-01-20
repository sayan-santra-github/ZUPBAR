const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const router = require("./routers/pages")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('./db/connectdb')


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'hbs')
app.set("views", path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, "../templates/partials"))
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