const alertaModel = require('../models/alertas');

const getAllAlertas = async (req, res) => {
    try {
        const alertas = await alertaModel.getAll();
        res.json(alertas);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
    }
};

const createAlerta = async (req, res) => {
    const { id_sensor, mensaje, nivel } = req.body;
    if (!mensaje) {
        return res.status(400).json({ message: 'El mensaje es obligatorio' });
    }

    try {
        const nuevaAlerta = await alertaModel.create({ id_sensor, mensaje, nivel });
        res.status(201).json(nuevaAlerta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateAlerta = async (req, res) => {
    const { id_sensor, mensaje, nivel } = req.body;
    const id = req.params.id;

    try {
        const alertaExistente = await alertaModel.getById(id);
        if (!alertaExistente) {
            return res.status(404).json({ message: 'Alerta no encontrada' });
        }

        const datosActualizar = {
            id_sensor: id_sensor !== undefined ? id_sensor : alertaExistente.id_sensor,
            mensaje: mensaje !== undefined ? mensaje : alertaExistente.mensaje,
            nivel: nivel !== undefined ? nivel : alertaExistente.nivel
        };

        const alertaActualizada = await alertaModel.update(id, datosActualizar);
        res.json(alertaActualizada);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteAlerta = async (req, res) => {
    const id = req.params.id;

    try {
        const alertaExistente = await alertaModel.getById(id);
        if (!alertaExistente) {
            return res.status(404).json({ message: 'Alerta no encontrada' });
        }

        await alertaModel.delete(id);
        res.json({ message: 'Alerta eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllAlertas,
    getAlertaById,
    createAlerta,
    updateAlerta,
    deleteAlerta
};
