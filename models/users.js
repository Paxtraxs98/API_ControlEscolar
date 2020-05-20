const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name:{
        type:String,
        required:true
    },
    surnameP:{
        type:String,
        required:true      
    },
    surnameM:{
        type:String,
        required:true        
    },
    address:{
        type: String,
        required:true        
    },
    phone:{
        type: String,
        required:true        
    },
    email:{
        type:String,
        required:true        
    },    
    password:{
        type:String        
    },    
    imageProfile:{
        type:String,
        default:null                
    },
    specialite:{
        type: Schema.ObjectId,
        ref : "Specialites",
        required:true
    },
    statusInPage:{
        type:Boolean,        
        default:false        
    },
    statusInSchool:{
        type:Boolean,        
        default:true        
    },
    typeOfUsers:{
        type: Schema.ObjectId,
        ref : "TypeofUser",
        required:true
    }
});

module.exports = mongoose.model("User",userSchema);