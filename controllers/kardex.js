const Kardex = require("../models/kardex");

function saveKardex(req,res)
{
    const idUser = req.params.userId;
    const kardex = new Kardex(req.body);
    kardex.student = idUser;
    kardex.save().then(
        saveKardex=>{
            !saveKardex ? res.status(404).send({message:"Error al guardar Kardex"}) : res.status(200).send({message:"Kardex Guardado",saveKardex});
        }).catch(
        err=>{
            res.status(500).send({message:"Error en el Servidor"});
        });
}
function addSubjectKardex(req,res)
{    
    const idUser = req.params.userId;
    const idSubject = req.params.subjectId;        
    const idSchedule = req.params.scheduleId;        
    const update =  {'subject':idSubject};
    Kardex.findOneAndUpdate({student:idUser},{'$addToSet':{'history':update}},{new:true}).then(
        addSubjectKardex=>{            
            if(!addSubjectKardex)
            {
                res.status(404).send({message:"No se pudo guardar la Materia"})
            }
            else
            {
                Kardex.findOneAndUpdate({"student":idUser},{$addToSet:{schedules:idSchedule}},{new:true}).then(
                    addSchedule=>{
                        !addSchedule ? res.status(404).send({message:"Error al Asignar Materia"}) : res.status(200).send({message:" Materia Asignada",addSchedule})
                    }).catch(
                    err=>{
                        res.status(500).send({message:"Error en el servidor"})
                    });
            }
        }).catch(
        err=>{
            res.status(500).send({message:"Error en el servidor"})
        });    
}
function removeSubjectKardex(req,res)
{    
    const idUser = req.params.userId;
    const idSubject = req.params.subjectId;        
    const idSchedule = req.params.scheduleId;  
    const update =  {'subject':idSubject};
    Kardex.findOneAndUpdate({student:idUser},{'$pull':{'history':update}},{new:true}).then(
        removeSubjectKardex=>{            
            if(!removeSubjectKardex)
            {
                res.status(404).send({message:"No se pudo remover la Materia"})
            }
            else
            {
                Kardex.findOneAndUpdate({"student":idUser},{$pull:{schedules:idSchedule}},{new:true}).then(
                    removeSchedule=>{
                        !removeSchedule ? res.status(404).send({message:"Error al remover Materia"}) : res.status(200).send({message:" Materia removida",removeSchedule})
                    }).catch(
                    err=>{
                        res.status(500).send({message:"Error en el servidor"})
                    });
            }
        }).catch(
        err=>{
            res.status(500).send({message:"Error en el servidor",err})
        });    
}
function getKardex(req,res)
{
    const idUser = req.params.userId;
    Kardex.find({student:idUser}).populate({path: 'schedules',model:'Schedule'}).populate({path:"history.subject",model:"Subject"}).then(
        kardex=>{
            !kardex ? res.status(200).send({message:"Sin Materias"}) : res.status(200).send({kardex});
        }
    ).catch(
        err=>{
            res.status(500).send({message:"Error en el servidor"})
        }
    );
}
function removeSchedules(req,res)
{
    Kardex.updateMany({},{schedules:[]}).then(
        scheduleRemoved=>{
            !scheduleRemoved ? res.status(404).send({message:"Error al Remover Horarios"}) : res.status(200).send({message:"Horarios Removidos",scheduleRemoved});
        }).catch(
        err=>{
            res.status(500).send({message:"Error en el servidor",err})
        });
}
function updateScore(req,res)
{
    const idUser = req.params.userId;
    const idSubject = req.params.subjectId;
    const score = req.body.score;
    var update = {
        $set:{'history.$.score': score}
        }
    Kardex.findOneAndUpdate({"student":idUser,"history.subject":idSubject},update,{new:true}).then(
        scoreUpdate=>{
            !scoreUpdate ? res.status(404).send({message:"Error al Asignar Calificacion"}) : res.status(200).send({message:"Calificacion Asignada",scoreUpdate});
        }
    ).catch(
        err=>{
            res.status(500).send({message:"Error en el servidor",err})
        }
    );
}
module.exports = {
    saveKardex,
    addSubjectKardex,
    removeSubjectKardex,
    getKardex,
    removeSchedules,
    updateScore
}
