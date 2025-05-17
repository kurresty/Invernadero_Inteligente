
const Configuracion = require('../models/configuracion');

const getAllConfiguraciones = async (req, res) => {
    try {
        const configuraciones = await Configuracion.getAll();
        res.json(configuraciones);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getConfiguracionById = async (req, res) => {
    try {
        const configuracion = await Configuracion.getById(req.params.id);
        if (!configuracion) {
            return res.status(404).json({ message: 'Configuración no encontrada' });
        }
        res.json(configuracion);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createConfiguracion = async (req, res) => {
    const {
        id_usuario,
        id_actuador,
        id_sensor,
        nombre_configuracion,
        descripcion,
        condicion_activacion,
        accion_a_realizar,
        estado
    } = req.body;

    try {
        const nuevaConfiguracion = await Configuracion.create(
            id_usuario,
            id_actuador,
            id_sensor,
            nombre_configuracion,
            descripcion,
            condicion_activacion,
            accion_a_realizar,
            estado
        );
        res.status(201).json(nuevaConfiguracion);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateConfiguracion = async (req, res) => {
    const id_configuracion = req.params.id;
    const {
        id_usuario,
        id_actuador,
        id_sensor,
        nombre_configuracion,
        descripcion,
        condicion_activacion,
        accion_a_realizar,
        estado
    } = req.body;

    try {
        const configuracionActualizada = await Configuracion.update(
            id_configuracion,
            id_usuario,
            id_actuador,
            id_sensor,
            nombre_configuracion,
            descripcion,
            condicion_activacion,
            accion_a_realizar,
            estado
        );
        res.json(configuracionActualizada);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteConfiguracion = async (req, res) => {
    try {
        await Configuracion.delete(req.params.id);
        res.json({ message: 'Configuración eliminada correctamente' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllConfiguraciones,
    getConfiguracionById,
    createConfiguracion,
    updateConfiguracion,
    deleteConfiguracion
};
