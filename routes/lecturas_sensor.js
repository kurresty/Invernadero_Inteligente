const express = require('express');
const router = express.Router();
const lecturasController = require('../controllers/lecturas_sensor');

router.get('/', lecturasController.getAllLecturas);
router.get('/:id', lecturasController.getLecturaById);
router.post('/', lecturasController.createLectura);
router.put('/:id', lecturasController.updateLectura);
router.delete('/:id', lecturasController.deleteLectura);

module.exports = router;
