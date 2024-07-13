// productoService.test.js
const { createProduct } = require('../service/productoService');
const db = require('../config/db');

// Mocking the executeQuery function from db
jest.mock('../config/db', () => ({
  executeQuery: jest.fn(),
}));

describe('createProduct', () => {
  it('should call executeQuery with correct parameters', async () => {
    const mockProduct = {
      codigo_alfa: '123',
      descripcion: 'Test Product',
      precio: 100,
      graba_iva: true,
      marca: 'Test Brand',
      color_1: 'Red',
      color_2: 'Blue',
      valido: true,
      dias_entrega: 5,
      id_envio: 1,
      id_cat_niv3: 2,
      producto_destacado: true,
      idestado: 1,
    };

    db.executeQuery.mockResolvedValueOnce({});

    await createProduct(mockProduct);

    expect(db.executeQuery).toHaveBeenCalledWith(expect.any(String), [
      mockProduct.codigo_alfa,
      mockProduct.descripcion,
      mockProduct.precio,
      mockProduct.graba_iva,
      mockProduct.marca,
      mockProduct.color_1,
      mockProduct.color_2,
      mockProduct.valido,
      mockProduct.dias_entrega,
      mockProduct.id_envio,
      mockProduct.id_cat_niv3,
      mockProduct.producto_destacado,
      mockProduct.idestado,
    ]);
  });

  // Aquí puedes agregar más pruebas, por ejemplo, para manejar y probar errores.
});