require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const router = require("./routers/pages")
require('./db/connectdb')


app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../public/photos')))
app.use(express.static(path.join(__dirname, '../src/middleware/auth')))
app.use(router);

const port = process.env.PORT || 57412;

app.listen(port, () => {
    console.log(`Listening.....`);
})