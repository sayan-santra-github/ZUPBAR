const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sayan-santra:JEug3zHSsNZG3DTp@zupbar-database-cluster.7e93bqx.mongodb.net/?retryWrites=true&w=majority&appName=ZUPBAR-DATABASE-CLUSTER')
.then(()=>{
    console.log('Connection sucssful....')
})
.catch((e)=>{
    console.log(e)
})