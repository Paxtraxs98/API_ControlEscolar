const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kardexSchema = Schema({
    student:{
        type:Schema.ObjectId,
        ref: "User",
        required:(true,"El ID del alumno es nesesario")
    },
    history:[
        {
            subject:{
                type: Schema.ObjectId,
                ref: "Subject"
            },
            score :
            {
                type: String,
                default: "null"
            }    
        }        
    ],
    schedules:[
        {
            type: Schema.ObjectId,
            ref: "Schedule"         
        }    
    ]      
});

module.exports = mongoose.model("Kardex",kardexSchema);