const db = require('../config/mysql');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM lecturas_sensor');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM lecturas_sensor WHERE id_lectura = ?', [id]);
    return rows[0] || null;
};

const create = async (id_sensor, valor) => {
    const [result] = await db.query(
        'INSERT INTO lecturas_sensor (id_sensor, valor) VALUES (?, ?)',
        [id_sensor, valor]
    );

    const [rows] = await db.query('SELECT * FROM lecturas_sensor WHERE id_lectura = ?', [result.insertId]);
    return rows[0];
};

const update = async (id, id_sensor, valor) => {
    const lecturaExistente = await getById(id);
    if (!lecturaExistente) {
        return null;
    }

    const newIdSensor = id_sensor !== undefined ? id_sensor : lecturaExistente.id_sensor;
    const newValor = valor !== undefined ? valor : lecturaExistente.valor;

    await db.query(
        'UPDATE lecturas_sensor SET id_sensor = ?, valor = ? WHERE id_lectura = ?',
        [newIdSensor, newValor, id]
    );

    return getById(id);
};

const deleteLectura = async (id) => {
    const [result] = await db.query('DELETE FROM lecturas_sensor WHERE id_lectura = ?', [id]);
    return { affectedRows: result.affectedRows };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteLectura
};
