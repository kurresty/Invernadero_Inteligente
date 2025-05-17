const db = require('../config/mysql');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM acciones_actuador');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM acciones_actuador WHERE id_accion = ?', [id]);
    return rows[0] || null;
};

const create = async ({ id_actuador, estado, duracion_seg }) => {
    const [result] = await db.query(
        'INSERT INTO acciones_actuador (id_actuador, estado, duracion_seg) VALUES (?, ?, ?)',
        [id_actuador, estado, duracion_seg || 0]
    );
    return {
        id_accion: result.insertId,
        id_actuador,
        estado,
        duracion_seg: duracion_seg || 0,
        fecha_hora: new Date()
    };
};

const update = async (id, datosActualizados) => {
    const accionExistente = await getById(id);
    if (!accionExistente) {
        return null;
    }

    const {
        id_actuador = accionExistente.id_actuador,
        estado = accionExistente.estado,
        duracion_seg = accionExistente.duracion_seg
    } = datosActualizados;

    await db.query(
        'UPDATE acciones_actuador SET id_actuador = ?, estado = ?, duracion_seg = ? WHERE id_accion = ?',
        [id_actuador, estado, duracion_seg, id]
    );

    return getById(id);
};

const deleteAccion = async (id) => {
    const [result] = await db.query('DELETE FROM acciones_actuador WHERE id_accion = ?', [id]);
    return { affectedRows: result.affectedRows };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteAccion
};
