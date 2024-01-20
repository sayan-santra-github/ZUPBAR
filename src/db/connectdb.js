const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/User_Database')
.then(()=>{
    console.log('Connection sucssful....')
})
.catch((e)=>{
    console.log(e)
})