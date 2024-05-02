var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var attendShcema = new Schema(
    {
        user_id: { type: String, required: true },
        start_time: { type: Number,required:true},
        end_time: {type:Number,required:true},
        salary:{type:Number,required:true},
        ot: { type: Number, required: true },
        total: { type: Number, required: true },
        isAvilabaleReport: { type: Boolean, default: false }
    }
);

var model = mongoose.model("attend", attendShcema);
module.exports = model;
