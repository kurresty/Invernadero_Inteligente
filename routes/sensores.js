const express = require('express');
const router = express.Router();
const sensoresController = require('../controllers/sensores');

router.get('/', sensoresController.getAllSensores);
router.get('/:id', sensoresController.getSensorById);
router.post('/', sensoresController.createSensor);
router.put('/:id', sensoresController.updateSensor);
router.delete('/:id', sensoresController.deleteSensor);

module.exports = router;
