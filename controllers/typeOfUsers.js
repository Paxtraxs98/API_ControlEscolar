const typeUser = require("../models/typeOfUsers");

function saveType (req,res)
{
    const type = new typeUser(req.body);
    type.save().then(
        typeSave=>{
            !typeSave ? res.status(404).send({message:"Error al Guardar"}) : res.status(200).send({message:"Tipo de Usuario Guardado"})
        }).catch(
        err=>{
            if(err.message)
            {
                res.status(500).send({message:"Error en el Servidor ,Faltan Datos por llenar"});
            }           
        })
}
function getType(req,res)
{
    var find;
    const idTipo = req.params.idType;    
    if(idTipo)
    {        
        find= typeUser.findById(idTipo)
    }
    else
    {
        find= typeUser.find({})   
    }
    find.then(
        getType=>{
            !getType ? res.status(404).send({message:"Error al Mostrar tipos"}) : res.status(200).send({getType})
        }).catch(
        err=>{
            if(err.message)
            {
                res.status(500).send({message:"Error en el Servidor"});
            }           
        })
}
module.exports = 
{
    saveType,
    getType
}