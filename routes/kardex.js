const express = require("express");
const kardexController = require("../controllers/kardex");
const api = express.Router();
const md_auth = require("../middleware/authoentification");

api.post('/saveKardex/:userId',md_auth.ensureAuth,kardexController.saveKardex);
api.get('/getKardex/:userId',md_auth.ensureAuth,kardexController.getKardex);
api.put('/addSubjectKardex/:userId/:subjectId/:scheduleId',md_auth.ensureAuth,kardexController.addSubjectKardex);
api.put('/removeSubjectKardex/:userId/:subjectId/:scheduleId',md_auth.ensureAuth,kardexController.removeSubjectKardex);
api.put('/removeSchedules',md_auth.ensureAuth,kardexController.removeSchedules);
api.put('/updateScore/:userId/:subjectId',md_auth.ensureAuth,kardexController.updateScore);

module.exports = api ;