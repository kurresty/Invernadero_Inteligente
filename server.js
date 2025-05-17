const express = require('express');
const app = express();
require('dotenv').config();


const Sensores = require('./routes/sensores');
const Actuadores = require('./routes/actuadores');
const Alertas = require('./routes/alertas');
const LecturasSensor = require('./routes/lecturas_sensor');
const Usuario = require('./routes/usuario');
const Configuracion = require('./routes/configuracion'); 
const AccionesActuador = require('./routes/accionesactuador'); 

app.use(express.json());

app.use('/api/sensores', Sensores);
app.use('/api/actuadores', Actuadores);
app.use('/api/alertas', Alertas);
app.use('/api/lecturas_sensor', LecturasSensor);
app.use('/api/usuario', Usuario);
app.use('/api/configuracion', Configuracion); 
app.use('/api/acciones_actuador', AccionesActuador); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
