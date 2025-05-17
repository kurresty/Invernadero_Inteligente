

const db = require('../config/mysql');


const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM sensores');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM sensores WHERE id_sensor = ?', [id]);
    return rows[0];
};

const create = async (tipo, descripcion, unidad, ubicacion) => {
    const [result] = await db.query(
        'INSERT INTO sensores (tipo, descripcion, unidad, ubicacion) VALUES (?, ?, ?, ?)',
        [tipo, descripcion, unidad, ubicacion]
    );
    return { id_sensor: result.insertId, tipo, descripcion, unidad, ubicacion };
};

const update = async (id_sensor, tipo, descripcion, unidad, ubicacion) => {
    await db.query(
        'UPDATE sensores SET tipo = ?, descripcion = ?, unidad = ?, ubicacion = ? WHERE id_sensor = ?',
        [tipo, descripcion, unidad, ubicacion, id_sensor]
    );
    return { id_sensor, tipo, descripcion, unidad, ubicacion };
};

const deleteSensor = async (id_sensor) => {
    await db.query('DELETE FROM sensores WHERE id_sensor = ?', [id_sensor]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteSensor
};
