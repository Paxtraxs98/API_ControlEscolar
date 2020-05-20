const express = require("express");
const specialiteController = require("../controllers/specialites");
const api = express.Router();
const md_auth = require("../middleware/authoentification");

api.post('/saveSpecialite',md_auth.ensureAuth,specialiteController.saveSpecialite);
api.get('/getSpecialites/:idSpecialite?',md_auth.ensureAuth,specialiteController.getSpecialites);
api.put('/updateSpecialite/:idSpecialite',md_auth.ensureAuth,specialiteController.updateSpecialite);

module.exports = api ;