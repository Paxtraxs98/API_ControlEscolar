const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = Schema({  
    subject:
    {
        type: Schema.ObjectId,
        ref: "Subject",
        required:(true,"Materia Obligatoria")
    },
    teacher:
    {
        type: Schema.ObjectId,
        ref: "User",
        required:(true,"Maestro Obligatorio")
    },
    days:
    {
        type: String,
        required:(true,"Dias Obligatorios")
    },
    schedule:
    {
        type: String,
        required:(true,"Horario Obligatorio")
    },
    classroom:
    {
        type: String,
        required:(true,"Salon Obligatorio")
    }
});

module.exports = mongoose.model("Schedule",scheduleSchema);


