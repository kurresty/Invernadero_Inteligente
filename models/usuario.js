const db = require('../config/mysql');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM usuario');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
    return rows[0];
};

const create = async (correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login) => {
    const [result] = await db.query(
        `INSERT INTO usuario (correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login]
    );
    return { id_usuario: result.insertId, correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login };
};

const update = async (id_usuario, correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login) => {
    await db.query(
        `UPDATE usuario 
         SET correo = ?, password = ?, nombre = ?, apellido = ?, rol = ?, activo = ?, fecha_registro = ?, ultimo_login = ? 
         WHERE id_usuario = ?`,
        [correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login, id_usuario]
    );
    return { id_usuario, correo, password, nombre, apellido, rol, activo, fecha_registro, ultimo_login };
};

const deleteUsuario = async (id_usuario) => {
    await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteUsuario
};
