const express = require("express");

// patient
const patientController = require("../controllers/patientController");
const patientRouter = express.Router();

// middleware
const auth = require('../middlewares/auth')

patientRouter.post("/newPatient", auth, patientController.newPatient);
patientRouter.post("/searchPatientByName", auth, patientController.searchPatientByName);
patientRouter.put("/updatePatient", auth, patientController.updatePatient);

module.exports = patientRouter;