var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var empTypeShcema = new Schema(
    {
        type: { type: String, required: true },
        salary: { type: Number, required: true },
        ot: { type: Number, required: true }
    }
);

var model = mongoose.model("emp_type", empTypeShcema);
module.exports = model;
