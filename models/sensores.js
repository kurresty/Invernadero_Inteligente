const db = require('../config/mysql');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM sensores');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM sensores WHERE id_sensor = ?', [id]);
    return rows[0] || null;
};

const create = async (tipo, descripcion, ubicacion) => {
    const [result] = await db.query(
        'INSERT INTO sensores (tipo, descripcion, ubicacion) VALUES (?, ?, ?)',
        [tipo, descripcion, ubicacion]
    );
    return {
        id_sensor: result.insertId,
        tipo,
        descripcion,
        ubicacion
    };
};

const update = async (id, tipo, descripcion, ubicacion) => {
    await db.query(
        'UPDATE sensores SET tipo = ?, descripcion = ?, ubicacion = ? WHERE id_sensor = ?',
        [tipo, descripcion, ubicacion, id]
    );
    return getById(id);
};

const deleteSensor = async (id) => {
    const [result] = await db.query('DELETE FROM sensores WHERE id_sensor = ?', [id]);
    return { affectedRows: result.affectedRows };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteSensor
};
