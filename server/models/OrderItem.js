const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    user_id:{type:String,required:true},
    order_id:{type:String,required:true},
    product_id:{type:String,required:true},
    quantity:{type:Number,required:true},
    total:{type:Number,required:true}
});

const orderItem = mongoose.model("order_item", orderItemSchema);
module.exports = orderItem;