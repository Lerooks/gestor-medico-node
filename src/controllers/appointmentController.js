const { Sequelize } = require("sequelize");
const Appointment = require("../models/Appointment");

module.exports = {
    async newAppointment(req, res) {
        const { appointmentDate, description, patientId, physicianId } = req.body;
        if (!appointmentDate || !description || !patientId || !physicianId) {
            res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos." });
        }
        const appointment = await Appointment.create({
            appointmentDate,
            description,
            patientId,
            physicianId   
        }).catch((error) => {
            res.status(500).json({ msg: "Não foi possível inserir os dados." });
        });

        if (appointment) res.status(201).json({ msg: "Nova consulta foi adicionada." });
        else res.status(404).json({ msg: "Não foi possível cadastrar nova consulta." });
    },
    async searchAppointmentByPatientId(req, res) {
        const patientId = req.query.patientId;

        if (!patientId) {
            res.status(400).json({
                msg: "Parâmetro 'patientId' está vazio."
            });
        }

        const appointments = await Appointment.findAll({
            where: { patientId },
        });

        if (appointments) {
            if (appointments == "") {
                res.status(404).json({
                    msg: "Consultas não encontradas."
                });
            } else {
                res.status(200).json({ appointments });
            }
        } else {
            res.status(404).json({
                msg: "Consultas não encontradas."
            });
        }
    },
    async searchAppointmentByPhysicianId(req, res) {
        const physicianId = req.query.physicianId;

        if (!physicianId) {
            res.status(400).json({
                msg: "Parâmetro 'physicianId' está vazio."
            });
        }

        const appointments = await Appointment.findAll({
            where: { physicianId },
        });

        if (appointments) {
            if (appointments == "") {
                res.status(404).json({
                    msg: "Consultas não encontradas."
                });
            } else {
                res.status(200).json({ appointments });
            }
        } else {
            res.status(404).json({
                msg: "Consultas não encontradas."
            });
        }
    },
    async deleteAppointment(req, res) {
        const id = req.query.id;

        if (!id) res.status(400).json({ msg: "Parâmetro 'id' está vazio." });

        const appointment = await Appointment.findByPk(id);        

        if (!appointment) {
            res.status(404).json({ msg: "Consulta não encontrada." });
            return;
        }
        
        await appointment.destroy();

        return res.status(200).json({
            msg: "Consulta deletada com sucesso."
        });
    }
}