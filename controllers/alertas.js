const alertaModel = require('../models/alertas');

const getAllAlertas = async (req, res) => {
    try {
        const alertas = await alertaModel.getAll();
        res.json(alertas);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getAlertaById = async (req, res) => {
    try {
        const alerta = await alertaModel.getById(req.params.id);
        if (!alerta) {
            return res.status(404).json({ message: 'Alerta no encontrada' });
        }
        res.json(alerta);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createAlerta = async (req, res) => {
    const { id_sensor, mensaje, nivel } = req.body;

    if (!mensaje) {
        return res.status(400).json({ message: 'El campo mensaje es obligatorio' });
    }

    try {
        const nuevaAlerta = await alertaModel.create(id_sensor, mensaje, nivel);
        res.status(201).json(nuevaAlerta);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateAlerta = async (req, res) => {
    const { id_sensor, mensaje, nivel } = req.body;

    if (mensaje === null || mensaje === undefined) {
        return res.status(400).json({ message: 'El campo mensaje es obligatorio' });
    }

    try {
        const alertaActualizada = await alertaModel.update(req.params.id, id_sensor, mensaje, nivel);
        res.json(alertaActualizada);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteAlerta = async (req, res) => {
    try {
        await alertaModel.delete(req.params.id);
        res.json({ message: 'Alerta eliminada correctamente' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllAlertas,
    getAlertaById,
    createAlerta,
    updateAlerta,
    deleteAlerta
};
