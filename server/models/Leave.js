const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leavSchema = new Schema({
    user_id: { type: String, required: true },
    from_date:{type:String,required:true},
    to_date:{type:String,required:true},
    text:{type:String,required:true}
});

const leave = mongoose.model("leave", leavSchema);
module.exports = leave;