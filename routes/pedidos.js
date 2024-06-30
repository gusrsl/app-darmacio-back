const express = require('express');
const router = express.Router();
const pedidoController = require('../controller/pedidosController');

router.post('/pedidos', pedidoController.createPedido);
router.get('/pedidos/:id', pedidoController.getPedidoById);
router.get('/pedidos', pedidoController.getAllPedidos);
router.put('/pedidos/:id', pedidoController.updatePedido);
router.delete('/pedidos/:id', pedidoController.deletePedido);
router.get('/pedidosreport', pedidoController.getPedidosReport);


module.exports = router;