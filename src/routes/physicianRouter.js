const express = require("express");

// physician
const physicianRouter = express.Router();
const physicianController = require("../controllers/physicianController");

// middleware
const auth = require('../middlewares/auth')

// autenticação
physicianRouter.post('/authentication', physicianController.authentication);

physicianRouter.get("/listAllPhysicians", auth, physicianController.listAllPatients);
physicianRouter.post("/newPhysician", physicianController.newPhysicians);
physicianRouter.delete("/deletePhysician/:id", auth, physicianController.deletePhysician);
physicianRouter.put("/updatePhysician/:id", auth, physicianController.updatePhysician);

module.exports = physicianRouter;