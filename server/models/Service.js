const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({

    sName : {
        type : String,
        required : true 
    },

    sPrice : {
        type : Number,
        required : true
    },


    sDescription : {
        type : String,
        required : true
    },

    sType : {
        type : String,
        required : true
    },


});

const Service = mongoose.model(`Service`,serviceSchema);

module.exports = Service;