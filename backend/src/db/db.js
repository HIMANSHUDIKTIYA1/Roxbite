const mongoose = require('mongoose')
const ID = process.env.MONGO_URL
const connectdb = ()=>{
    mongoose.connect(ID).then(()=> {
        console.log("db is connected")
    }).catch(()=>{
console.log("db is not connected")
    })
}
module.exports = connectdb ; 