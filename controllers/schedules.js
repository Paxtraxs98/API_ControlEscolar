const Schedules = require("../models/schedules");

function saveSchedule(req,res)
{
    const schedule = new Schedules(req.body);
    schedule.save().then(
        scheduleSave=>{
            !scheduleSave ? res.status(404).send({message:"Error al Guardar Horario"}) : res.status(200).send({message:"Horario Guardado",scheduleSave});
        }).catch(
        err=>{
            res.status(500).send({message:"Faltan datos por llenar"})
        });
}

// function getSchedule(req,res)
// {
//     const idSchedule = req.params.scheduleId;
//     Schedules.findById(idSchedule).populate({path:'subject'}).populate({path:'teacher',select:['name','surnameP']}).then(
//         scheduleSearch=>{
//             !scheduleSearch ? res.status(404).send({message:"Error al Mostrar Horario"}) : res.status(200).send(scheduleSearch)
//         }
//     ).catch(
//         err=>{
//             res.status(500).send({message:"Error en el Servidor"})
//         }
//     );
// }
function getSchedules(req,res)
{    
    let idSchedule=req.params.scheduleId;
    let find;
    idSchedule ?  find=Schedules.findById(idSchedule) : find=Schedules.find({});
    find.populate({path:'subject',populate: {path: 'specialite'}}).populate({path:'teacher',select:['name','surnameP']}).then(
        schedulesSearch=>{
            !schedulesSearch ? res.status(404).send({message:"Error al Mostrar Horarios"}) : res.status(200).send({schedules:schedulesSearch})
        }
    ).catch(
        err=>{
            res.status(500).send({message:"Error en el Servidor"})
        }
    );
}
function updateSchedule(req,res)
{
    const idSchedule = req.params.scheduleId;
    const update = req.body;
    Schedules.findByIdAndUpdate(idSchedule,update).then(
        scheduleUpdate=>{
            !scheduleUpdate ? res.status(404).send({message:"Error al Modificar Horario"}) : res.status(200).send({message:"Horario Modificado",scheduleUpdate});
        }
    ).catch(
        err=>{
            res.status(500).send({message:"Error en el Servidor"})
        }
    );
}
function deleteSchedule(req,res)
{
    const idSchedule = req.params.scheduleId;
    Schedules.findByIdAndRemove(idSchedule).then(
        scheduleDelete=>{
            !scheduleDelete ? res.status(404).send({message:"Error al Eliminar Horario"}) : res.status(200).send({message:"Horario Eliminado",scheduleDelete});
        }
    ).catch(
        err=>{
            res.status(500).send({message:"Error en el Servidor"})
        }
    );
}
function deleteSchedules(req,res)
{        
    Schedules.remove().then(
        scheduleSearch=>{
            !scheduleSearch ? res.status(404).send({message:"Error al Eliminar los Horarios"}) :res.status(200).send({message:"Se Eliminaron todos los Horarios"})
        }
    ).catch(
        err=>{
            res.status(500).send({message:"Error en el Servidor"})
        }
    );    
}
module.exports = {
    saveSchedule,
    // getSchedule,
    getSchedules,
    updateSchedule,
    deleteSchedule,
    deleteSchedules
}