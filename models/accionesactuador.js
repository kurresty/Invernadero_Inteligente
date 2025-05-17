const db = require('../config/mysql');

const AccionActuador = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM acciones_actuador');
        return rows;
    },

    getById: async (id_accion) => {
        const [rows] = await db.query(
            'SELECT * FROM acciones_actuador WHERE id_accion = ?',
            [id_accion]
        );
        return rows[0];
    },

    create: async (id_actuador, estado, duracion_seg, fecha_hora) => {
        if (!fecha_hora) {
            const [result] = await db.query(
                'INSERT INTO acciones_actuador (id_actuador, estado, duracion_seg) VALUES (?, ?, ?)',
                [id_actuador, estado, duracion_seg]
            );
            return { id_accion: result.insertId, id_actuador, estado, duracion_seg };
        } else {
            const [result] = await db.query(
                'INSERT INTO acciones_actuador (id_actuador, estado, duracion_seg, fecha_hora) VALUES (?, ?, ?, ?)',
                [id_actuador, estado, duracion_seg, fecha_hora]
            );
            return { id_accion: result.insertId, id_actuador, estado, duracion_seg, fecha_hora };
        }
    },

    update: async (id_accion, id_actuador, estado, duracion_seg, fecha_hora) => {
        const [result] = await db.query(
            `UPDATE acciones_actuador SET 
                id_actuador = ?, 
                estado = ?, 
                duracion_seg = ?, 
                fecha_hora = ? 
            WHERE id_accion = ?`,
            [id_actuador, estado, duracion_seg, fecha_hora, id_accion]
        );
        return { id_accion, id_actuador, estado, duracion_seg, fecha_hora };
    },

    delete: async (id_accion) => {
        const [result] = await db.query(
            'DELETE FROM acciones_actuador WHERE id_accion = ?',
            [id_accion]
        );
        return result;
    }
};

module.exports = AccionActuador;
