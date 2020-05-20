const express = require("express");
const subjectController = require("../controllers/subject");
const api = express.Router();
const md_auth = require("../middleware/authoentification");

api.post('/saveSubject',md_auth.ensureAuth,subjectController.saveSubject);
api.get('/getSubjects/:subjectId?',md_auth.ensureAuth,subjectController.getSubjects);
api.put('/updateSubject/:subjectId',md_auth.ensureAuth,subjectController.updateSubject);
api.put('/subscribeSubject/:subjectId',md_auth.ensureAuth,subjectController.subscribeSubject);
api.put('/unSubscribeSubject/:subjectId',md_auth.ensureAuth,subjectController.unSubscribeSubject);

module.exports = api ;