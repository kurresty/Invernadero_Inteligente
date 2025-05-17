const express = require('express');
const router = express.Router();
const actuadoresController = require('../controllers/actuadores');

router.get('/', actuadoresController.getAllActuadores);
router.get('/:id', actuadoresController.getActuadorById);
router.post('/', actuadoresController.createActuador);
router.put('/:id', actuadoresController.updateActuador);
router.delete('/:id', actuadoresController.deleteActuador);

module.exports = router;
