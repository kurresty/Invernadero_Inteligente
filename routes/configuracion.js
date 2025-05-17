const express = require('express');
const router = express.Router();
const configuracionController = require('../controllers/configuracion');

router.get('/', configuracionController.getAllConfiguraciones);
router.get('/:id', configuracionController.getConfiguracionById);
router.post('/', configuracionController.createConfiguracion);
router.put('/:id', configuracionController.updateConfiguracion);
router.delete('/:id', configuracionController.deleteConfiguracion);

module.exports = router;
