const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;


const productSchema = new Schema({
    id: objectId,
    product_name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    quantity_available: { type: Number, required: true },
    weight: { type: Number },
    thumbnail: {type:String,required:true},
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    discount: { type: Number },
    date_added: { type: Number},
    date_updated: { type: Number},
});

const product = mongoose.model("product", productSchema);
module.exports = product;
