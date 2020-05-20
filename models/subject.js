const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = Schema({
    name:{
        type:String,
        required:true    
    },    
    status:
    {
        type: Boolean,
        default: true
    },
    grade:
    {
        type:String,
        required:true
    },
    specialite:{
        type: Schema.ObjectId,
        ref : "Specialites",
        required:true
    }
});

module.exports = mongoose.model("Subject",subjectSchema);