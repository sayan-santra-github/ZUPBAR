require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/User_Database')
.then(()=>{
    console.log('Connection sucssful....')
})
.catch((e)=>{
    console.log(e)
})