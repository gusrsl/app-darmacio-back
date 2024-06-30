const { poolPromise } = require('../config/db');

const createPedido = async (pedido) => {
  const client = await poolPromise.connect();
  console.log('pedido >> ',pedido)
  try {
    await client.query('BEGIN');
    const queryText = `
      INSERT INTO prc_pedidos (user_id, estado, subtotal, total, idestado)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, fecha_pedido, estado, subtotal, total, idestado`;
    const res = await client.query(queryText, [pedido.user_id, pedido.estado, pedido.subtotal, pedido.total, pedido.idestado]);
    const pedidoId = res.rows[0].id;

    const detailQueryText = `
      INSERT INTO detalle_pedidos (pedido_id, producto_id)
      VALUES ($1, $2)`;
    for (const producto_id of pedido.producto_ids) {
      await client.query(detailQueryText, [pedidoId, producto_id]);
    }

    await client.query('COMMIT');
    return { id: pedidoId, ...res.rows[0] };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const getPedidoById = async (id) => {
  const queryText = 'SELECT * FROM prc_pedidos WHERE id = $1';
  const { rows } = await poolPromise.query(queryText, [id]);
  return rows[0];
};

const getAllPedidos = async () => {
  const queryText = 'SELECT * FROM prc_pedidos';
  const { rows } = await poolPromise.query(queryText);
  return rows;
};

const updatePedido = async (id, updatedFields) => {
  const setQuery = Object.keys(updatedFields)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ');
  const queryText = `UPDATE prc_pedidos SET ${setQuery} WHERE id = $1 RETURNING *`;
  const { rows } = await poolPromise.query(queryText, [id, ...Object.values(updatedFields)]);
  return rows[0];
};

const deletePedido = async (id) => {
  const client = await poolPromise.connect();
  try {
    await client.query('BEGIN');
    const deleteDetailQuery = 'DELETE FROM detalle_pedidos WHERE pedido_id = $1';
    await client.query(deleteDetailQuery, [id]);

    const deletePedidoQuery = 'DELETE FROM prc_pedidos WHERE id = $1';
    await client.query(deletePedidoQuery, [id]);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }

};

const getPedidosReport = async () => {
  const client = await poolPromise.connect();
  try {
    const queryText = `
      SELECT
    pe.id,
    CONCAT(us.nombre, ' ', us.apellido) AS nombre_completo,
    pe.fecha_pedido,
    pe.estado,
    us.ciudad,
    us.correo,
    us.codigopostal,
    us.direccion,
    pe.subtotal,
    pe.total
FROM prc_pedidos pe
INNER JOIN usuarios us ON us.id = pe.user_id
LEFT JOIN detalle_pedidos dp ON dp.pedido_id = pe.id
ORDER BY pe.id DESC;
`;
    const { rows } = await client.query(queryText);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createPedido,
  getPedidoById,
  getAllPedidos,
  updatePedido,
  deletePedido,
  getPedidosReport, // Agregar esta línea para exportar la nueva función

};
