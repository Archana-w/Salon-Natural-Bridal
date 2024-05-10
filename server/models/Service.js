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

    imageUrl: { 
        type: String,
        //required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }


});

const Service = mongoose.model(`Service`,serviceSchema);

module.exports = Service;