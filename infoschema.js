const mongoose = require('mongoose');
 
const infoschema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    Email:{
        type : String,
        required: true
    },
    MobileNumber :{
        required : true,
        type : Number
    },
    password:{
        required:true,
        type :String
    },
    ConfirmPassword:{
        required:true,
        type: String

        
    }
    
    });
    
module.exports = mongoose.model('infoschema',infoschema);