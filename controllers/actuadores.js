const actuadorModel = require('../models/actuadores');

const tiposPermitidos = ['Bomba de agua', 'Ventilador'];
const tiemposPermitidos = ['2', '4', '5'];

const getAllActuadores = async (req, res) => {
    try {
        const actuadores = await actuadorModel.getAll();
        res.json(actuadores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getActuadorById = async (req, res) => {
    try {
        const actuador = await actuadorModel.getById(req.params.id);
        if (!actuador) {
            return res.status(404).json({ message: 'Actuador no encontrado' });
        }
        res.json(actuador);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createActuador = async (req, res) => {
    const { tipo, descripcion, tiempo } = req.body;

    if (!tipo || !tiposPermitidos.includes(tipo)) {
        return res.status(400).json({ message: 'Tipo inválido o faltante. Debe ser "Bomba de agua" o "Ventilador"' });
    }

    if (tiempo && !tiemposPermitidos.includes(tiempo)) {
        return res.status(400).json({ message: 'Tiempo inválido. Debe ser 2, 4 o 5' });
    }

    try {
        const nuevoActuador = await actuadorModel.create({
            tipo,
            descripcion: descripcion || null,
            tiempo: tiempo || null
        });
        res.status(201).json(nuevoActuador);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateActuador = async (req, res) => {
    const { id } = req.params;
    const { tipo, descripcion, tiempo } = req.body;

    try {
        const actuadorExistente = await actuadorModel.getById(id);
        if (!actuadorExistente) {
            return res.status(404).json({ message: 'Actuador no encontrado' });
        }

        if (tipo && !tiposPermitidos.includes(tipo)) {
            return res.status(400).json({ message: 'Tipo inválido. Debe ser "Bomba de agua" o "Ventilador"' });
        }

        if (tiempo && !tiemposPermitidos.includes(tiempo)) {
            return res.status(400).json({ message: 'Tiempo inválido. Debe ser 2, 4 o 5' });
        }

        const datosActualizar = {
            tipo: tipo || actuadorExistente.tipo,
            descripcion: descripcion !== undefined ? descripcion : actuadorExistente.descripcion,
            tiempo: tiempo !== undefined ? tiempo : actuadorExistente.tiempo
        };

        const actuadorActualizado = await actuadorModel.update(id, datosActualizar);
        res.json(actuadorActualizado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteActuador = async (req, res) => {
    try {
        const result = await actuadorModel.delete(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Actuador no encontrado' });
        }
        res.json({ message: 'Actuador eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllActuadores,
    getActuadorById,
    createActuador,
    updateActuador,
    deleteActuador
};
