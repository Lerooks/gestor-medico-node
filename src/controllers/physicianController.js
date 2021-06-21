const { Sequelize } = require("sequelize");
const Physician = require("../models/Physician");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// funções que vai ser usada apenas nesse scope
function passwordValidation(password) {
    if (password.length < 8) return "Senha deve ter no minimo 8 caracteres";
    else if (!password.match(/[a-zA-Z]/g))
        return "Senha deve ter no mínimo uma letra";
    else if (!password.match(/[0-9]+/))
        return "Senha deve ter no mínimo um número";
    else return "OK";
}

// ela recebe id do usuário que está logado, gera um número aleatório
function generateToken(id) {
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 82800, // expira em 24 horas;
    })
    return token
}

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

        const passwordValid = passwordValidation(password);
        if (passwordValid !== "OK")
            return res.status(400).json({ msg: passwordValid })

        const isPhysicianNew = await Physician.findOne({
            where: { email }
        });
        if (isPhysicianNew)
            res.status(403).json({ msg: "vendedor já cadastrado." });
        else {
            // calcular o hash da senha
            const salt = bcrypt.genSaltSync(12); // sequencia aleatoria de letra e caracteres
            const hash = bcrypt.hashSync(password, salt);

            const physician = await Physician.create({
                name, email, password: hash,
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
        console.log(physicianId);
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
    async authentication(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password)
            return req.status(400).json({ msg: "Campos obrigatórios vazios! " });
        try {
            const physician = await Physician.findOne({
                where: { email }
            })

            if (!physician)
                return res.status(404).json({ msg: "Usuário e senha inválidos" })
            else {
                console.log('achou');
                if (bcrypt.compareSync(password, physician.password)) {
                    const token = generateToken(physician.id);
                    return res
                        .status(200)
                        .json({ msg: "Autenticação válida", token })
                } else {
                    return res.status(404).json({ msg: "Usuário e senha inválidos" })
                }
            }

        } catch (error) {
            console.log(error);
            res.status(404).json(error)
        }
    }
};