const lecturaModel = require('../models/lecturas_sensor');

const getAllLecturas = async (req, res) => {
    try {
        const lecturas = await lecturaModel.getAll();
        res.json(lecturas);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getLecturaById = async (req, res) => {
    try {
        const lectura = await lecturaModel.getById(req.params.id);
        if (!lectura) {
            return res.status(404).json({ message: 'Lectura no encontrada' });
        }
        res.json(lectura);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createLectura = async (req, res) => {
    const { id_sensor, valor } = req.body;
    try {
        const nuevaLectura = await lecturaModel.create(id_sensor, valor);
        res.status(201).json(nuevaLectura);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateLectura = async (req, res) => {
    const { id_sensor, valor } = req.body;
    try {
        const lecturaActualizada = await lecturaModel.update(req.params.id, id_sensor, valor);
        res.json(lecturaActualizada);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteLectura = async (req, res) => {
    try {
        await lecturaModel.delete(req.params.id);
        res.json({ message: 'Lectura eliminada correctamente' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllLecturas,
    getLecturaById,
    createLectura,
    updateLectura,
    deleteLectura
};
