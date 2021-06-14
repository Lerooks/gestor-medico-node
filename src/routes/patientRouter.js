const express = require("express");
const patientController = require("../controllers/patientController");
const patientRouter = express.Router();


patientRouter.post("/newPatient",
    patientController.newPatient);
patientRouter.post("/searchPatientByName",
    patientController.searchPatientByName);
patientRouter.put("/updatePatient",
    patientController.updatePatient);

module.exports = patientRouter;