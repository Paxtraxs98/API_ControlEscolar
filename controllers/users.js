const User = require("../models/users");
const bcrypt = require("bcrypt-nodejs");
const jwt = require('../services/jwt');

const fs = require("fs");
const path = require("path");

function saveUser (req,res)
{
    const user = new User(req.body);
    user.password = bcrypt.hashSync('school2020');             
    user.save().then(
        userSave=>{
            !userSave ? res.status(404).send({message:"Error al Guardar"}) : res.status(200).send({message:"Usuario Guardado",userSave})
        }).catch(
        err=>{
            if(err.message)
            {
                res.status(500).send({message:"Error en el Servidor ,Faltan Datos por llenar"});
            }           
            console.log(err);
        })   
}
function login(req,res)
{
    const params = req.body
    User.findOne({email:params.email}).populate({path:"typeOfUsers", select: 'name'}).populate({path:"specialite", select: 'name'}).then(
        user=>{
            if(!user)
            {
                res.status(404).send({message:"No existe el usuario"});
            }
            else
            {
                bcrypt.compare(params.password,user.password,function(err,check){
                    if(check)
                    {                        
                        params.gethash ? res.status(200).send({token:jwt.createtoken(user),user:user}) : res.status(200).send({user:user})
                    }
                    else
                    {
                        res.status(400).send({message: "Las contraseñas no son iguales"});
                    }
                })
            }
        }).catch(
        err=>{
            res.status(500).send({message:"Error en el servidor"})
        })
}
function getUser(req,res)
{
    const idUser = req.params.userId;
    console.log(idUser);
    User.findById(idUser).populate({path:"typeOfUsers", select: 'name'}).populate({path:"specialite", select: 'name'}).then(
        userSearch=>{
            !userSearch ? res.status(404).send({message:"Error al Buscar Alumno"}) : res.status(200).send({userSearch});
        }).catch(
        err=>{
            res.status(500).send({message:"Error en el servidor"});
        });
}
function getUsersForType(req,res)
{   
    const tipo = req.params.type;
    User.find({typeOfUsers:tipo}).sort('name').populate({path:"typeOfUsers", select: 'name'}).populate({path:"specialite", select: 'name'}).then(
        usersSearch=>{
            !usersSearch ? res.status(404).send({message:"Error al Buscar Usuarios"}) : res.status(200).send(usersSearch)
        }).catch(
        err=>{
                res.status(500).send({message:"Error en el servidor"});
        })   
  
}
function updateUser(req,res)
{
    const idUser = req.params.userId;    
    const updates =req.body;    
    if(updates.password=='')
    {
        delete updates.password;        
        User.findByIdAndUpdate(idUser,updates,{new:true}).then(
            userUpdate=>{
                !userUpdate ? res.status(404).send({message:"Error al Modificar"}) : res.status(200).send({message:"Usuario Modificado",userUpdate})
            }).catch(
            err=>{
                console.log("entrar err")
                res.status(500).send(err)
            });                 
    }
    else
    { 
        User.findById(idUser).then(
            userSearch=>{
                bcrypt.compare(updates.password,userSearch.password,function(err,check){
                    if(check)
                    {
                        res.status(400).send({message:"Las contraseñas son iguales,Escoje otra"});
                    }
                    else
                    {   
                        var passwordUpdate= updates.password;                    
                        updates.password = bcrypt.hashSync(passwordUpdate);                                                        
                        User.findByIdAndUpdate(idUser,updates,{new:true}).then(
                            userUpdate=>{
                                !userUpdate ? res.status(404).send({message:"Error al Modificar"}) : res.status(200).send({message:"Usuario Modificado",userUpdate})
                            }).catch(
                            err=>{
                                console.log("entrar err")
                                res.status(500).send(err)
                            });                 
                    }
                })       
            }).catch(
            err=>{
                res.status(500).send({message:"Error en el servidor"});
            });                
    }   
}
function unSuscribeUser(req,res)
{
    const idUser = req.params.userId;
    var update = {$set:{statusInSchool: false}};
    User.findByIdAndUpdate(idUser,update,{new:true}).then(unsubscribe=>{
        !unsubscribe ? res.status(404).send({message:"Error al dar de baja"}) : res.status(200).send({message:"Usuario dado de baja",unsubscribe})
    }).catch(
        err=>{
            res.status(500).send({message:"Error en el Servidor"})
        });
}
function suscribeUser(req,res)
{
    const idUser = req.params.userId;
    var update = {$set:{statusInSchool: true}};
    User.findByIdAndUpdate(idUser,update,{new:true}).then(subscribe=>{
        !subscribe ? res.status(404).send({message:"Error al dar de alta"}) : res.status(200).send({message:"Usuario dado de alta",subscribe})
    }).catch(
        err=>{
            res.status(500).send({message:"Error en el Servidor"})
        });
}
function uploadImage(req,res)
{
    const idUser = req.params.userId;
    if(req.files)
    {
        const file_path = req.files.image.path;
        const file_split = file_path.split('\.');
        const extencion = file_split[1];
        if(extencion == "jpg" || extencion == "jpge")
        {
            User.findByIdAndUpdate(idUser,{imageProfile:file_path},{new:true}).populate({path:"typeOfUsers", select: 'name'}).populate({path:"specialite", select: 'name'}).then(
                imageUpdate=>{                        
            !imageUpdate ? res.status(404).send({message:"Error al Cambiar Imagen"}) : res.status(200).send({message:"Imagen Cambiada",imageUpdate})
                }).catch(
                    err=>{
                        res.status(500).send({message:"Error en el Servidor"});
                });
        }
        else
        {
            res.status(500).send({message:"Imagen no valida ,usa imagen .jpg o . jpge"});
        }
        
    }
}
function getImagenUser(req,res)
{
    const imagenFile = req.params.imagenFile;
    const path_file = './uploads/users/'+imagenFile
    fs.exists(path_file,function(exists){
        exists ?  res.sendFile(path.resolve(path_file)) : res.status(404).send({message:"No existe la imagen"});
    })
}
module.exports = 
{
    saveUser,
    login,
    updateUser,
    unSuscribeUser,
    suscribeUser,
    getUser,
    getUsersForType,
    uploadImage,
    getImagenUser
}