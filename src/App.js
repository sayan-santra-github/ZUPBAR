const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const router = require("./routers/pages")
require('./db/connectdb')


app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, './public/user_profile_photos')))
app.use(express.static(path.join(__dirname, '../public/photos')))
app.use(express.static(path.join(__dirname, '../src/middleware/auth')))
app.use(router);


app.listen(8000, () => {
    console.log("Listening on port 8000.....")
})