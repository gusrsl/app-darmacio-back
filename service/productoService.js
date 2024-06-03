const {
  executeQuery,
  searchAll,
  searchOne,
  update,
  deleteOne,
} = require('../config/db')

async function createProduct(product) {
  const query = `
        INSERT INTO prm_producto
        (uu_id, codigo_alfa, descripcion, precio, graba_iva, marca, color_1,
          color_2, valido, dias_entrega, id_envio, id_cat_niv3,
          fecha_creacion, producto_destacado, idestado)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, NOW(), $12, $13)
    `
  const values = [
    product.codigo_alfa,
    product.descripcion,
    product.precio,
    product.graba_iva,
    product.marca,
    product.color_1,
    product.color_2,
    product.valido,
    product.dias_entrega,
    product.id_envio,
    product.id_cat_niv3,
    product.producto_destacado,
    product.idestado,
  ]

  try {
    await executeQuery(query, values)
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

async function getAllProducts() {
  try {
    const query = `SELECT * FROM prm_producto`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting all products:', error)
    throw error
  }
}

async function getDestacProducts() {
  try {
    const query = `SELECT * FROM prm_producto where producto_destacado = true`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting destac products:', error)
    throw error
  }
}

async function getProductById(id) {
  try {
    const query = 'SELECT * FROM prm_producto WHERE uu_id = $1'
    const result = await searchOne(query, [id])

    return result
  } catch (error) {
    console.error('Error getting product by id:', error)
    throw error
  }
}

async function updateProduct(id, product) {
  const query = `
        UPDATE prm_producto
        SET codigo_alfa = $1,
          descripcion = $2, precio = $3, graba_iva = $4, marca = $5,
          color_1 = $6, color_2 = $7, valido = $8, dias_entrega = $9,
          id_envio = $10, id_cat_niv3 = $11, fecha_creacion = $12,
          producto_destacado = $13, idestado = $14
        WHERE uu_id = $15
    `
  const values = [
    product.codigo_alfa,
    product.descripcion,
    product.precio,
    product.graba_iva,
    product.marca,
    product.color_1,
    product.color_2,
    product.valido,
    product.dias_entrega,
    product.id_envio,
    product.id_cat_niv3,
    product.fecha_creacion,
    product.producto_destacado,
    product.idestado,
    id,
  ]
  try {
    await update(query, values)
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

async function deleteProduct(id) {
  try {
    const query = `DELETE FROM prm_producto WHERE uu_id = $1`

    await deleteOne(query, [id])
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getDestacProducts,
}
