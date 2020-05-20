const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specialitesSchema = Schema({  
    name:
    {
        type: String,
        required:(true,"Nombre Obligatorios")
    },
    status:
    {
        type: Boolean,
        default:true        
    }    
});

module.exports = mongoose.model("Specialites",specialitesSchema);


