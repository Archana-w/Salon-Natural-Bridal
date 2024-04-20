const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    user_id: { type: String, required: true },
    name:{type:String,required:true},
    address:{type:String,required:true},
    phone_number:{type:String,required:true}
});

const address = mongoose.model("address", addressSchema);
module.exports = address;