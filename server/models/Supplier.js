const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  orderMessage: { type: String, default: '' },
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
