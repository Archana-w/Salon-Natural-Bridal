const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    supplierId: { type: String, ref: 'User', required: true }
});

const SupplierProduct = mongoose.model('SupplierProduct', supplierSchema);
module.exports = SupplierProduct;