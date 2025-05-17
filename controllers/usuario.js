const Usuario = require('../models/usuario');

const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getAll();
        res.json(usuarios);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.getById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createUsuario = async (req, res) => {
    const { correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login } = req.body;
    try {
        const nuevoUsuario = await Usuario.create(correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login);
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateUsuario = async (req, res) => {
    const { correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login } = req.body;
    const id_usuario = req.params.id;
    try {
        const usuarioActualizado = await Usuario.update(id_usuario, correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login);
        res.json(usuarioActualizado);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteUsuario = async (req, res) => {
    try {
        await Usuario.delete(req.params.id);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
