// #Mongoose Schema
const mongoose=require('mongoose')
let userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    pname:String,
    barcode:{type:String,unique:true,required:true},
    date:{type:Date,default:Date.now()},
    cdate:String,
    edate:String,
    price:String,
    quantity:String,
})
module.exports=mongoose.model('product',userSchema)