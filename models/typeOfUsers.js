const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeOfUserSchema = Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }    
});

module.exports = mongoose.model("TypeofUser",typeOfUserSchema);