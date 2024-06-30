const pedidoService = require('../service/pedidosService');

const createPedido = async (req, res) => {
  try {
    const pedido = req.body;
    const newPedido = await pedidoService.createPedido(pedido);
    res.status(201).json(newPedido);
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear pedido' });
  }
};

const getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoService.getPedidoById(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.status(200).json(pedido);
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    res.status(500).json({ message: 'Error al obtener pedido' });
  }
};

const getAllPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.getAllPedidos();
    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

const updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const updatedPedido = await pedidoService.updatePedido(id, updatedFields);
    res.status(200).json(updatedPedido);
  } catch (error) {
    console.error('Error al actualizar pedido:', error);
    res.status(500).json({ message: 'Error al actualizar pedido' });
  }
};

const deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    await pedidoService.deletePedido(id);
    res.status(200).json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar pedido:', error);
    res.status(500).json({ message: 'Error al eliminar pedido' });
  }
};

// Nuevo método para obtener el reporte de pedidos
const getPedidosReport = async (req, res) => {
    try {
      const report = await pedidoService.getPedidosReport();
      res.status(200).json(report);
    } catch (error) {
      console.error('Error al obtener el reporte de pedidos:', error);
      res.status(500).json({ message: 'Error al obtener el reporte de pedidos' });
    }
  };
  

module.exports = {
  createPedido,
  getPedidoById,
  getAllPedidos,
  updatePedido,
  deletePedido,
  getPedidosReport, // Agregar esta línea para exportar el nuevo método

};
