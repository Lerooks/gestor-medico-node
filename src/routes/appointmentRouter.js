const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");

appointmentRouter.post('/newAppointment', appointmentController.newAppointment);
appointmentRouter.get('/searchAppointmentByPatientId', appointmentController.searchAppointmentByPatientId);
appointmentRouter.get('/searchAppointmentByPhysicianId', appointmentController.searchAppointmentByPhysicianId);
appointmentRouter.delete('/deleteAppointment', appointmentController.deleteAppointment);

module.exports = appointmentRouter;