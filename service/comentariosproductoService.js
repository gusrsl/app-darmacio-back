const {
  executeQuery,
  searchAll,
  searchOne,
  deleteOne,
  update,
} = require('../config/db')

async function createProductComment(productComment) {
  try {
    const query = `
      INSERT INTO prd_comentarios_producto
      ( id_producto, comentario, idestado)
      VALUES ($1, $2, $3)`

    await executeQuery(query, [
      productComment.id_producto,
      productComment.comentario,
      productComment.idestado,
    ])
  } catch (error) {
    console.error('Error creating product comment:', error)
    throw error
  }
}

async function getAllProductComments() {
  try {
    const query = `SELECT * FROM prd_comentarios_producto`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting all product comments:', error)
    throw error
  }
}

async function getProductCommentById(id) {
  try {
    const query = `SELECT * FROM prd_comentarios_producto WHERE id = $1`
    const result = await searchOne(query, [id])

    return result
  } catch (error) {
    console.error('Error getting product comment by id:', error)
    throw error
  }
}

async function updateProductComment(id, productComment) {
  try {
    const query = `
    UPDATE prd_comentarios_producto
    SET id_producto = $1,
        comentario = $2,
        idestado = $3
    WHERE id = $4`

    await update(query, [
      productComment.id_producto,
      productComment.comentario,
      productComment.idestado,
      id,
    ])
  } catch (error) {
    console.error('Error updating product comment:', error)
    throw error
  }
}

async function deleteProductComment(id) {
  try {
    const query = `DELETE FROM prd_comentarios_producto WHERE id = $1`

    await deleteOne(query, [id])
  } catch (error) {
    console.error('Error deleting product comment:', error)
    throw error
  }
}

module.exports = {
  createProductComment,
  getAllProductComments,
  getProductCommentById,
  updateProductComment,
  deleteProductComment,
}
