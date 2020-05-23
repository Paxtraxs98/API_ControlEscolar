const express = require("express");
const scheduleController = require("../controllers/schedules");
const api = express.Router();
const md_auth = require("../middleware/authoentification");

api.post('/saveSchedule',md_auth.ensureAuth,scheduleController.saveSchedule);
api.get('/getSchedules/:scheduleId?',md_auth.ensureAuth,scheduleController.getSchedules);
// api.get('/getSchedules',md_auth.ensureAuth,scheduleController.getSchedules);
api.put('/updateSchedule/:scheduleId',md_auth.ensureAuth,scheduleController.updateSchedule);
api.delete('/deleteSchedule/:scheduleId',md_auth.ensureAuth,scheduleController.deleteSchedule);
api.delete('/deleteSchedules',md_auth.ensureAuth,scheduleController.deleteSchedules);

module.exports = api ;