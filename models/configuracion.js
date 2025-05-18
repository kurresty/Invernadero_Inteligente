const db = require('../config/mysql');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM configuracion');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM configuracion WHERE id_configuracion = ?', [id]);
    return rows[0];
};

const create = async (
    id_usuario,
    id_actuador,
    id_sensor,
    nombre_configuracion,
    descripcion,
    condicion_activacion,
    accion_a_realizar,
    estado
) => {
    const [result] = await db.query(
        `INSERT INTO configuracion (
            id_usuario,
            id_actuador,
            id_sensor,
            nombre_configuracion,
            descripcion,
            condicion_activacion,
            accion_a_realizar,
            estado
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id_usuario,
            id_actuador,
            id_sensor,
            nombre_configuracion,
            descripcion,
            condicion_activacion,
            accion_a_realizar,
            estado
        ]
    );

    return { id_configuracion: result.insertId, id_usuario, id_actuador, id_sensor, nombre_configuracion, descripcion, condicion_activacion, accion_a_realizar, estado };
};

const update = async (
    id_configuracion,
    id_usuario,
    id_actuador,
    id_sensor,
    nombre_configuracion,
    descripcion,
    condicion_activacion,
    accion_a_realizar,
    estado
) => {
    await db.query(
        `UPDATE configuracion SET
            id_usuario = ?,
            id_actuador = ?,
            id_sensor = ?,
            nombre_configuracion = ?,
            descripcion = ?,
            condicion_activacion = ?,
            accion_a_realizar = ?,
            estado = ?
        WHERE id_configuracion = ?`,
        [
            id_usuario,
            id_actuador,
            id_sensor,
            nombre_configuracion,
            descripcion,
            condicion_activacion,
            accion_a_realizar,
            estado,
            id_configuracion
        ]
    );

    return getById(id_configuracion);
};

const deleteConfiguracion = async (id) => {
    await db.query('DELETE FROM configuracion WHERE id_configuracion = ?', [id]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteConfiguracion
};
