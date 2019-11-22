const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.get('/', clientesController.get);
router.get('/compradores', clientesController.getBuyers);
router.get('/:cpf', clientesController.getByCpf);
router.post('/', clientesController.post);
router.put('/:id', controller.update);
router.delete('/:id', controller.deletarCliente);

module.exports = router;