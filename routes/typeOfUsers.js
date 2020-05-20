const express = require("express");
const typeUserController = require("../controllers/typeOfUsers");
const api = express.Router();
const md_auth = require("../middleware/authoentification");

api.post('/saveType',md_auth.ensureAuth,typeUserController.saveType);
api.get('/getType/:idType?',md_auth.ensureAuth,typeUserController.getType);

module.exports = api ;