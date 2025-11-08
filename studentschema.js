const mongoose=require('mongoose')

const model=mongoose.Schema({
    userid:String,
    password:String,
    name:String,
    Branch:String,
    complaints:[{complaintid:String,title:String,department:String,status:String,remarks:String}]
})

module.exports=mongoose.model('model',model)
