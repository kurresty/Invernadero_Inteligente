const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    const { correo, password, nombre, apellido, rol, activo } = req.body;
    try {
       
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await Usuario.create(correo, hashedPassword, nombre, apellido, rol, activo);
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


const loginUsuario = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.getByCorreo(correo);

        if (!usuario) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        await Usuario.updateUltimoLogin(usuario.id_usuario);

       
        const token = jwt.sign(
            { id: usuario.id_usuario, rol: usuario.rol },
            'secreto_super_seguro', 
            { expiresIn: '2h' }
        );

        res.json({
            message: 'Login exitoso',
            token,
            usuario: {
                id: usuario.id_usuario,
                correo: usuario.correo,
                rol: usuario.rol,
                nombre: usuario.nombre,
                apellido: usuario.apellido
            }
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario 
};
