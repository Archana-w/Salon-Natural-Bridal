var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var appShcema = new Schema(
    {
        time_range:{type:String,required:true},
        date:{type:String,required:true},
        time:{type:Number,required:true},
        user_id:{type:String,required:true},
        service_id:{type:String,required:true},
        status:{type:String,required:true}
    }
);

var model = mongoose.model("appointment", appShcema);
module.exports = model;