const express = require("express");

// appointment
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");

// middleware
const auth = require('../middlewares/auth')

appointmentRouter.post('/newAppointment', auth, appointmentController.newAppointment);
appointmentRouter.get('/searchAppointmentByPatientId', auth, appointmentController.searchAppointmentByPatientId);
appointmentRouter.get('/searchAppointmentByPhysicianId', auth, appointmentController.searchAppointmentByPhysicianId);
appointmentRouter.delete('/deleteAppointment', auth, appointmentController.deleteAppointment);

module.exports = appointmentRouter;