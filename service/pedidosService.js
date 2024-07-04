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
  const queryText = `
  select 
    * 
  from prc_pedidos p
  inner join usuarios u on u.id = p.user_id
  where u.id = $1
  order by p.id
  `;
  const { rows } = await poolPromise.query(queryText, [id]);
  return rows;
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
      CONCAT(MAX(us.nombre), ' ', MAX(us.apellido)) AS nombre_completo,
      MAX(pe.fecha_pedido) AS fecha_pedido,
      MAX(pe.estado) AS estado,
      MAX(us.ciudad) AS ciudad,
      MAX(us.correo) AS correo,
      MAX(us.codigopostal) AS codigopostal,
      MAX(us.direccion) AS direccion,
      MAX(pe.subtotal) AS subtotal,
      MAX(pe.total) AS total,
      ARRAY_AGG(dp.producto_id) AS productos
    FROM prc_pedidos pe
    INNER JOIN usuarios us ON us.id = pe.user_id
    LEFT JOIN detalle_pedidos dp ON dp.pedido_id = pe.id
    GROUP BY pe.id
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

const togglePedidoEstado = async (id) => {
  const client = await poolPromise.connect();
  try {
    const queryGetEstado = 'SELECT estado FROM prc_pedidos WHERE id = $1';
    const res = await client.query(queryGetEstado, [id]);
    const currentEstado = res.rows[0].estado;

    const newEstado = currentEstado === 'pendiente' ? 'entregado' : 'pendiente';

    const queryUpdateEstado = 'UPDATE prc_pedidos SET estado = $1 WHERE id = $2 RETURNING *';
    const updateRes = await client.query(queryUpdateEstado, [newEstado, id]);

    return updateRes.rows[0];
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
  togglePedidoEstado,
  getPedidosReport, // Agregar esta línea para exportar la nueva función

};
