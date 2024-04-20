const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user_id:{type:String,required:true},
    product_id:{type:String,required:true},
    quantity:{type:Number,required:true},
    added_date:{type:Number,required:true},
    total:{type:Number,required:true}
});

const cart = mongoose.model("cart",cartSchema);
module.exports = cart;