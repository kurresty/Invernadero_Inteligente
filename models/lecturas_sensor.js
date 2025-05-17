const db = require('../config/mysql');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM lecturas_sensor');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM lecturas_sensor WHERE id_lectura = ?', [id]);
    return rows[0];
};

const create = async (id_sensor, valor) => {
    const [result] = await db.query(
        'INSERT INTO lecturas_sensor (id_sensor, valor) VALUES (?, ?)',
        [id_sensor, valor]
    );
    return { id_lectura: result.insertId, id_sensor, valor };
};

const update = async (id_lectura, id_sensor, valor) => {
    await db.query(
        'UPDATE lecturas_sensor SET id_sensor = ?, valor = ? WHERE id_lectura = ?',
        [id_sensor, valor, id_lectura]
    );
    return { id_lectura, id_sensor, valor };
};

const deleteLectura = async (id_lectura) => {
    await db.query('DELETE FROM lecturas_sensor WHERE id_lectura = ?', [id_lectura]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteLectura
};
