const db = require('../config/mysql');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM alertas');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM alertas WHERE id_alerta = ?', [id]);
    return rows[0] || null;
};

const create = async (id_sensor, mensaje, nivel) => {
    const [result] = await db.query(
        'INSERT INTO alertas (id_sensor, mensaje, nivel) VALUES (?, ?, ?)',
        [id_sensor, mensaje, nivel]
    );
    return { id_alerta: result.insertId, id_sensor, mensaje, nivel };
};

const update = async (id_alerta, id_sensor, mensaje, nivel) => {
    await db.query(
        'UPDATE alertas SET id_sensor = ?, mensaje = ?, nivel = ? WHERE id_alerta = ?',
        [id_sensor, mensaje, nivel, id_alerta]
    );
    // Traemos el registro actualizado
    return getById(id_alerta);
};

const deleteAlerta = async (id_alerta) => {
    const [result] = await db.query('DELETE FROM alertas WHERE id_alerta = ?', [id_alerta]);
    return { affectedRows: result.affectedRows };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteAlerta
};
