const express = require("express");
const UserController = require("../controllers/users");
const api = express.Router();
const md_auth = require("../middleware/authoentification");
const  multipart = require("connect-multiparty");
const md_upload = multipart({uploadDir: './uploads/users'})

api.post('/saveUser',md_auth.ensureAuth,UserController.saveUser);
api.post('/login',UserController.login);
api.post('/uploadImagenUser/:userId',[md_auth.ensureAuth,md_upload],UserController.uploadImage);
api.get('/getUser/:userId',md_auth.ensureAuth,UserController.getUser);
api.get('/getUserforType/:type',md_auth.ensureAuth,UserController.getUsersForType);
api.get("/imageUser/uploads/users/:imagenFile",UserController.getImagenUser);
api.put('/updateUser/:userId',UserController.updateUser);
api.put('/unSuscribeUser/:userId',md_auth.ensureAuth,UserController.unSuscribeUser);
api.put('/suscribeUser/:userId',md_auth.ensureAuth,UserController.suscribeUser);


module.exports = api ;