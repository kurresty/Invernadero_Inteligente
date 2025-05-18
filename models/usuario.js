const db = require('../config/mysql');

// Obtener todos los usuarios
const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM usuario');
    return rows;
};

// Obtener usuario por ID
const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
    return rows[0];
};

// Buscar usuario por correo (para login)
const getByCorreo = async (correo) => {
    const [rows] = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
    return rows[0];
};

// Crear usuario
const create = async (correo, password, nombre, apellido, rol = 'usuario', activo = 1) => {
    const [result] = await db.query(
        `INSERT INTO usuario (correo, password, nombre, apellido, rol, activo) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [correo, password, nombre, apellido, rol, activo]
    );
    return {
        id_usuario: result.insertId,
        correo,
        password,
        nombre,
        apellido,
        rol,
        activo
    };
};

// Actualizar usuario
const update = async (id_usuario, correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login) => {
    await db.query(
        `UPDATE usuario 
         SET correo = ?, password = ?, nombre = ?, apellido = ?, rol = ?, activo = ?, fecha_registro = ?, ultimo_login = ? 
         WHERE id_usuario = ?`,
        [correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login, id_usuario]
    );
    return { id_usuario, correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login };
};

// Eliminar usuario
const deleteUsuario = async (id_usuario) => {
    await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario]);
};

// Actualizar el campo ultimo_login cuando se loguea
const updateUltimoLogin = async (id_usuario) => {
    await db.query('UPDATE usuario SET ultimo_login = NOW() WHERE id_usuario = ?', [id_usuario]);
};

module.exports = {
    getAll,
    getById,
    getByCorreo,
    create,
    update,
    delete: deleteUsuario,
    updateUltimoLogin
};
