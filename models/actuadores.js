const db = require('../config/mysql');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM actuadores');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM actuadores WHERE id_actuador = ?', [id]);
    return rows[0] || null;
};

const create = async ({ tipo, descripcion, tiempo }) => {
    const [result] = await db.query(
        'INSERT INTO actuadores (tipo, descripcion, tiempo) VALUES (?, ?, ?)',
        [tipo, descripcion || null, tiempo || null]
    );
    return {
        id_actuador: result.insertId,
        tipo,
        descripcion: descripcion || null,
        tiempo: tiempo || null
    };
};

const update = async (id, datosActualizados) => {
    const actuadorExistente = await getById(id);
    if (!actuadorExistente) {
        return null;
    }

    const {
        tipo = actuadorExistente.tipo,
        descripcion = actuadorExistente.descripcion,
        tiempo = actuadorExistente.tiempo
    } = datosActualizados;

    await db.query(
        'UPDATE actuadores SET tipo = ?, descripcion = ?, tiempo = ? WHERE id_actuador = ?',
        [tipo, descripcion, tiempo, id]
    );

    return getById(id);
};

const deleteActuador = async (id) => {
    const [result] = await db.query('DELETE FROM actuadores WHERE id_actuador = ?', [id]);
    return { affectedRows: result.affectedRows };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteActuador
};
