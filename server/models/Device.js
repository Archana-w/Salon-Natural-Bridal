var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var deviceShcema = new Schema(
    {
        token:{type:String,required:true},
        user_id:{type:String,required:true},
        time:{type:Number,required:true},
        expire:{type:Number,required:true}
    }
);

var model = mongoose.model("device", deviceShcema);
module.exports = model;