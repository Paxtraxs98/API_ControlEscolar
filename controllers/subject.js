const Subject = require("../models/subject");

function saveSubject(req,res)
{
    const subject = new Subject(req.body);
    subject.save().then(
        subjectSave => {
            !subjectSave ? res.status(404).send({message:"Error al Guardar Materia"}) : res.status(200).send({message:"Materia Guardada",subjectSave})
        }).catch(
        err=>{
            res.status(500).send({message:"Faltan datos por llenar"})
        });
}
function getSubjects(req,res)
{
    const idSubject = req.params.subjectId;
    var find;
    idSubject ? find=Subject.findById(idSubject) : find=Subject.find({});
    find.populate({path:"specialite", select: 'name'}).sort({specialite:1,grade:1}).then(
        subjectSearch => {
            !subjectSearch ? res.status(404).send({message:"Error al Mostrar Materia"}) : res.status(200).send({subjectSearch})
        }).catch(
        err=>{
            res.status(500).send({message:"Error en el servidor"})
        })
}
function unSubscribeSubject(req,res)
{
    const idsubject = req.params.subjectId;
    var update = {$set:{status: false}};
    Subject.findByIdAndUpdate(idsubject,update,{new:true}).then(unsubscribe=>{
        !unsubscribe ? res.status(404).send({message:"Error al dar de baja"}) : res.status(200).send({message:"Materia dada de baja",unsubscribe})
    }).catch(
        err=>{
            res.status(500).send({message:"Error en el Servidor"})
        });
}
function subscribeSubject(req,res)
{
    const idsubject = req.params.subjectId;
    var update = {$set:{status: true}};
    Subject.findByIdAndUpdate(idsubject,update,{new:true}).then(subscribe=>{
        !subscribe ? res.status(404).send({message:"Error al dar de alta"}) : res.status(200).send({message:"Materia dada de alta",subscribe})
    }).catch(
        err=>{
            res.status(500).send({message:"Error en el Servidor"})
        });
}
function updateSubject(req,res)
{
    const idsubject = req.params.subjectId;
    var update = req.body
    Subject.findByIdAndUpdate(idsubject,update,{new:true}).then(
        updateSubject=>{
            !updateSubject ? res.status(404).send({message:"Error al Modificar Materia"}) : res.status(200).send({message:"Materia Modificada",updateSubject})
        }).catch(
        err=>{
            res.status(500).send({message:"Error en el Servidor"})
        })
}
module.exports = {
    saveSubject,    
    getSubjects,
    unSubscribeSubject,
    subscribeSubject,
    updateSubject
}