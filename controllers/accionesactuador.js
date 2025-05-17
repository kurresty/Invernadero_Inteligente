const AccionActuador = require('../models/accionesactuador');


const getAllAcciones = async (req, res) => {
    try {
        const acciones = await Accion.getAll();
        res.json(acciones);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getAccionById = async (req, res) => {
    try {
        const accion = await Accion.getById(req.params.id);
        if (!accion) {
            return res.status(404).json({ message: 'Acción no encontrada' });
        }
        res.json(accion);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createAccion = async (req, res) => {
    const { id_actuador, estado, duracion_seg, fecha_hora } = req.body;
    try {
        const nuevaAccion = await Accion.create(id_actuador, estado, duracion_seg, fecha_hora);
        res.status(201).json(nuevaAccion);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateAccion = async (req, res) => {
    const { id_actuador, estado, duracion_seg, fecha_hora } = req.body;
    const id_accion = req.params.id;
    try {
        const accionActualizada = await Accion.update(id_accion, id_actuador, estado, duracion_seg, fecha_hora);
        res.json(accionActualizada);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteAccion = async (req, res) => {
    try {
        await Accion.delete(req.params.id);
        res.json({ message: 'Acción eliminada correctamente' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllAcciones,
    getAccionById,
    createAccion,
    updateAccion,
    deleteAccion
};
