const async = require('async');
const jwt = require('jsonwebtoken');
const Dentist = require('../users/dentist');
const Form = require('./form');
const Client = require('../users/client');
const config = require('../../config/config');

exports.verifyToken = async(req, res, next) => {
    const token = req.headers['authorization'];
    console.log("TOKEN ", token);
    if (!token) return res.status(403).send({error: "Token não fornecido."});

    jwt.verify(token, config.secret, (err, decoded) => {
        let userDecoded = decoded.user;
        if (err) return res.status(403).send({error: 'Falha ao autenticat token.' });

        else if (userDecoded.user.type === 'CLIENT'){
            return res.status(403).send({error: 'Não autorizado!'});
        }

        next();
    });
};
exports.create = async(req, res) => {

    const clinic = Clinic.findById(req.body.clinicID);
    const dentist = Dentist.findById(req.body.dentistID);
    const client = Client.findById(req.body.clientID);
    const dentalArch = DentalArch.findById(req.body.dentalArchID);

    try{
        if (!clinic){
            return res.status(400).send({ error: "Clínica não encontrada."});
        }else if(!dentist && dentist.type === 'DENTIST'){
            return res.status(400).send({ error: "Dentista não encontrado."});
        }else if(!client && client.type === 'CLIENT'){
            return res.status(400).send({ error: "Cliente não encontrado."});
        }else if(!dentalArch){
            return res.status(400).send({ error: "Arcada dentária não encontrada."});
        }

        let form = await Form.create(req.body);

        return res.status(200).send(form);
    } catch (e) {
        return res.status(400).send({error: 'Falha no cadastro. ' + e});
    }


};

exports.getAll = async (req, res) => {

    const forms = await Form.findAll();
    res.status(200).send(forms);

};

exports.update = function(req, res) {
    try {
        const formId = req.params.id;
        const form = await User.findById(formId);
        if(!form) {
            res.status(404).send({errorMessage: "Ficha não encontrada."});
        }

        if(req.body.clinicID){
            const clinic = Clinic.findById(req.body.clinicID);
            if(!clinic){
                return res.status(400).send({ error: "Clínica não encontrada."});
            }else{
                form.clinicID = req.body.clinicID
            }
        }
        if(req.body.dentistID){
            const dentist = Dentist.findById(req.body.dentistID);
            if(!dentist){
                return res.status(400).send({ error: "Dentista não encontrado."});
            }else{
                form.dentistID = req.body.dentistID;
            }
        }
        if(req.body.clientID){
            const client = Client.findById(req.body.clientID);
            if(!client){
                return res.status(400).send({ error: "Cliente não encontrado."});
            }else{
                form.clientID = req.body.clientID;
            }
        }
        if(req.body.dentalArchID){
            const dentalArch = DentalArch.findById(req.body.dentalArchID);
            if(!dentalArch){
                return res.status(400).send({ error: "Arcada dentária não encontrada."});
            }else{
                form.dentalArchID = req.body.dentalArchID;
            }
        }
        
        await Form.update({ _id: formId }, form);
        res.status(201).send({message: "O formulario foi atualizado com sucesso."});
    }catch (error) {
        res.status(500).send({errorMessage: error.message});

    }
};

exports.delete = async(req,  res) => {
    try {
        const formId = req.params.id;
        await Form.delete(formId);
        res.status(201).send({message: "O form foi deletado com sucesso."});
    }catch (error) {
        res.status(500).send({errorMessage: error.message});

    }
};

module.exports = exports;