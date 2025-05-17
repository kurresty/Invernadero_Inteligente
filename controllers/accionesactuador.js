const AccionActuador = require('../models/accionesactuador');

const getAllAcciones = async (req, res) => {
    try {
        const acciones = await AccionActuador.getAll();
        res.json(acciones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAccionById = async (req, res) => {
    try {
        const accion = await AccionActuador.getById(req.params.id);
        if (!accion) {
            return res.status(404).json({ message: 'Acción no encontrada' });
        }
        res.json(accion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createAccion = async (req, res) => {
    try {
        // Adaptado al nuevo método create que recibe un objeto
        const nuevaAccion = await AccionActuador.create(req.body);
        res.status(201).json(nuevaAccion);
    } catch (err) {
        res.status(400).json({ 
            error: 'Error al crear acción',
            details: err.message 
        });
    }
};

const updateAccion = async (req, res) => {
    try {
        // Adaptado al nuevo método update que recibe id y objeto
        const accionActualizada = await AccionActuador.update(
            req.params.id,
            req.body
        );
        res.json(accionActualizada);
    } catch (err) {
        res.status(400).json({ 
            error: 'Error al actualizar acción',
            details: err.message 
        });
    }
};

const deleteAccion = async (req, res) => {
    try {
        await AccionActuador.delete(req.params.id);
        res.json({ message: 'Acción eliminada correctamente' });
    } catch (err) {
        res.status(400).json({ 
            error: 'Error al eliminar acción',
            details: err.message 
        });
    }
};

module.exports = {
    getAllAcciones,
    getAccionById,
    createAccion,
    updateAccion,
    deleteAccion
};