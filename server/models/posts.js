const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,    
    },
    email: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true
    },
    review: { 
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default:10
    },
    reply: {
        type: String,
        default:""
    }
});

module.exports = mongoose.model('Posts', postSchema);
