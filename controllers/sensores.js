const sensorModel = require('../models/sensores');

const getAllSensores = async (req, res) => {
    try {
        const sensores = await sensorModel.getAll();
        res.json(sensores);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getSensorById = async (req, res) => {
    try {
        const sensor = await sensorModel.getById(req.params.id);
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor no encontrado' });
        }
        res.json(sensor);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createSensor = async (req, res) => {
    const { tipo, descripcion, unidad, ubicacion } = req.body;
    try {
        const nuevoSensor = await sensorModel.create(tipo, descripcion, unidad, ubicacion);
        res.status(201).json(nuevoSensor);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateSensor = async (req, res) => {
    const { tipo, descripcion, unidad, ubicacion } = req.body;
    try {
        const sensorActualizado = await sensorModel.update(req.params.id, tipo, descripcion, unidad, ubicacion);
        res.json(sensorActualizado);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteSensor = async (req, res) => {
    try {
        await sensorModel.delete(req.params.id);
        res.json({ message: 'Sensor eliminado correctamente' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllSensores,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor
};
