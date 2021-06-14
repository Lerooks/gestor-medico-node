const { Sequelize } = require("sequelize");
const Physician = require("../models/Physician");

module.exports = {
    async listAllPatients(req, res) {
        const physicians = await Physician.findAll({
            order: [["name", "ASC"]],
        }).catch((error) => {
            res.status(500).json({ msg: "falha na conexão." });
        });
        if (physicians) res.status(200).json({ physicians });
        else res.status(404).json({ msg: "Não foi possível encontrar..." });
    },
    async newPhysicians(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ msg: "dados obrigatórios não foram preenchidos" });
        }

        const isPhysicianNew = await Physician.findOne({
            where: { email }
        });
        if (isPhysicianNew)
            res.status(403).json({ msg: "vendedor já cadastrado." });
        else {
            const physician = await Physician.create({
                name, email, password,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados" });
            });
            if (physician) res.status(201).json({ msg: "Novo médico foi adicionado." });
            else res.status(404).json({
                msg: "Não foi possível cadastrar novo médico."
            });
        }
    },
    async deletePhysician(req, res) {
        const physicianId = req.params.id;
        const deletePhysician = await Physician.destroy({
            where: { id: physicianId },
        });
        if (deletePhysician != 0)
            res.status(200).json({ msg: "Médico excluido com sucesso." });
        else
            res.status(404).json({ msg: "Médico não encontrado." });
    },
    async updatePhysician(req, res) {
        const physicianId = req.body.id;
        const physician = req.body;
        if (!physicianId) res.status(400).json({ msg: "Id do médico vazio." });
        else {
            const physicianExists = await Physician.findByPk(physicianId);
            if (!physicianExists) res.status(404).json({ msg: "Médico não encontrado." });
            else {
                if (physician.name || physician.email) {
                    await Physician.update(physician, {
                        where: { id: physicianId },
                    });
                    return res.status(200).json({ msg: "Médico atualizado com sucesso." });
                }
                else {
                    return res.status(400).json({
                        msg: "Campos obrigatórios não preenchidos."
                    });
                }
            }
        }
    },
};