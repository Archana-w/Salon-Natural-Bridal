var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var appShcema = new Schema(
    {
        appoinment_time:{type:String,required:true},
        appoinment_date:{type:String,required:true},
        time:{type:Number,required:true},
        contact_number:{type:String,required:true},
        user_id:{type:String,required:true},
        status:{type:String,required:true},
        hair_care:{type:Array},
        skin_care: { type: Array },
        nail_care: { type: Array }
    }
);

var model = mongoose.model("appointment", appShcema);
module.exports = model;