var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

var userSchema = new Schema(
    {
        id: objectId,
        first_name:{type:String, required:true},
        last_name:{type:String, required:true},
        mobile_number:{type:String, required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        type:{type:String,required:true},
        sup_category:{type:String},
        emp_type:{type:String},
        profile_pic:{type:String},
        nic: { type: String }
    }
);

var user = mongoose.model("user", userSchema);
module.exports = user;
