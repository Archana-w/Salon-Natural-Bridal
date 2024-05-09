const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: { type: String, required: true },
    address_id:{type:String,required:true},
    date:{type:Number,required:true},
    total:{type:Number,required:true},
    discount:{type:Number,required:true},
    payment_method:{type:String,required:true},
    payment_status:{type:String,required:true},
    status:{type:String,required:true}
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
