const express = require("express");
const physicianRouter = express.Router();
const physicianController = require("../controllers/physicianController");

physicianRouter.get("/listAllPhysicians",
    physicianController.listAllPatients);
physicianRouter.post("/newPhysician",
    physicianController.newPhysicians);
physicianRouter.delete("/deletePhysician/:id",
    physicianController.deletePhysician);
physicianRouter.put("/updatePhysician/",
    physicianController.updatePhysician);

module.exports = physicianRouter;