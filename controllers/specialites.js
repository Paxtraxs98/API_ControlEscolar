const Specilites = require("../models/specialties");

function saveSpecialite(req,res)
{
    const specialite = new Specilites(req.body);
    specialite.save().then(
        specialiteSave=>{
            !specialiteSave ? res.status(404).send({message:"Error al guardar Especialidad"}) : res.status(200).send({message:"Especialidad Guardada"})
        }).catch(
            err=>{
                res.status(500).send({message:"Error en el servidor"})
            })
}
function getSpecialites(req,res)
{
    const idSpecialites = req.params.idSpecialite;
    let find;
    !idSpecialites ? find=Specilites.find({}) : find= Specilites.findById(idSpecialites);
    find.then(
        specialites=>{
            !specialites ? res.status(404).send({message:"Error al mostrar Especialidad"}) : res.status(200).send({specialites})
        }).catch(
            err=>{
                res.status(500).send({message:"Error en el servidor"})
            });
}
function updateSpecialite(req,res)
{
    const idSpecialites = req.params.idSpecialite;
    const update = req.body;
    Specilites.findByIdAndUpdate(idSpecialites,update,{new:true}).then(
        specialiteUpdate=>{
            !specialiteUpdate ? res.status(404).send({message:"Error al modificar Especialidad"}) : res.status(200).send({message:"Modificacion Exitosa",specialiteUpdate})
        }).catch(
            err=>{
                res.status(500).send({message:"Error en el servidor"})
            })
}

module.exports={
    saveSpecialite,
    getSpecialites,
    updateSpecialite
}