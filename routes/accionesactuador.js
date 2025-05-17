const express = require('express');
const AccionesActuador = require('../controllers/accionesactuador');
const router = express.Router();

router.get('/', AccionesActuador.getAllAcciones);
router.get('/:id', AccionesActuador.getAccionById);
router.post('/', AccionesActuador.createAccion);
router.put('/:id', AccionesActuador.updateAccion);
router.delete('/:id', AccionesActuador.deleteAccion);

module.exports = router;
