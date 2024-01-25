const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name:{type: String, require:true},
    age:{type:Number,require:true},
    mobileNumber:{type:Number, require:true},
    address:{type:String, require:true}
});
module.exports=mongoose.model('User',userSchema);