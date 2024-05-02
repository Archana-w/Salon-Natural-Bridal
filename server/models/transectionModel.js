const mongoose = require('mongoose');

const transectionSchema = new mongoose.Schema ({
    userid:{
        type:String,
        required:true,
    },

    amount:{
        type:Number,
        required:[true,'amount is require']
    },
    
    category:{
        type:String,
        required:[true,'Category is require']       
    },

    type:{
        type:String,
        require:[true,"type is required"]
    },

    refrence:{
        type:String,
        
    },

    description:{
        type:String,
        required:[true,'desc is require']
    },

    date:{
        type:Date,
        require:[true,'data is required']
    },

    isAuto:{
        type:Number,
        required:false
    },
    
},{timestamps:true})

const transectionModel = mongoose.model('transections',transectionSchema)
module.exports = transectionModel