const {
    createProductView,
    getAllProductViews,
    getProductViewById,
    updateProductView,
    deleteProductView,
  } = require('../service/vistasproductoService');
  const db = require('../config/db');
  
  // Mocking the db functions
  jest.mock('../config/db', () => ({
    executeQuery: jest.fn(),
    searchAll: jest.fn(),
    searchOne: jest.fn(),
    update: jest.fn(),
    deleteOne: jest.fn(),
  }));
  
  describe('Visitas Producto Service', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('createProductView', () => {
      it('should create a new product view', async () => {
        const mockProductView = {
          id_producto: 1,
          contador: 10,
          idestado: 1,
        };
  
        db.executeQuery.mockResolvedValueOnce({});
  
        await createProductView(mockProductView);
  
        expect(db.executeQuery).toHaveBeenCalledWith(expect.any(String), [
          mockProductView.id_producto,
          mockProductView.contador,
          mockProductView.idestado,
        ]);
      });
  
      it('should throw an error if query fails', async () => {
        const mockProductView = {
          id_producto: 1,
          contador: 10,
          idestado: 1,
        };
  
        db.executeQuery.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(createProductView(mockProductView)).rejects.toThrow('Database error');
      });
    });
  
    describe('getAllProductViews', () => {
      it('should return all product views', async () => {
        const mockProductViews = [
          { id: 1, id_producto: 1, contador: 10, idestado: 1 },
          { id: 2, id_producto: 2, contador: 5, idestado: 1 },
        ];
  
        db.searchAll.mockResolvedValueOnce(mockProductViews);
  
        const result = await getAllProductViews();
  
        expect(db.searchAll).toHaveBeenCalledWith(expect.any(String));
        expect(result).toEqual(mockProductViews);
      });
  
      it('should throw an error if query fails', async () => {
        db.searchAll.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(getAllProductViews()).rejects.toThrow('Database error');
      });
    });
  
    describe('getProductViewById', () => {
      it('should return product view by id', async () => {
        const mockId = 1;
        const mockProductView = { id: mockId, id_producto: 1, contador: 10, idestado: 1 };
  
        db.searchOne.mockResolvedValueOnce(mockProductView);
  
        const result = await getProductViewById(mockId);
  
        expect(db.searchOne).toHaveBeenCalledWith(expect.any(String), [mockId]);
        expect(result).toEqual(mockProductView);
      });
  
      it('should throw an error if query fails', async () => {
        const mockId = 1;
  
        db.searchOne.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(getProductViewById(mockId)).rejects.toThrow('Database error');
      });
    });
  
    describe('updateProductView', () => {
      it('should update product view and return updated product view', async () => {
        const mockId = 1;
        const mockProductView = {
          id_producto: 1,
          contador: 15,
          idestado: 1,
        };
  
        db.update.mockResolvedValueOnce({});
  
        await updateProductView(mockId, mockProductView);
  
        expect(db.update).toHaveBeenCalledWith(expect.any(String), [
          mockProductView.id_producto,
          mockProductView.contador,
          mockProductView.idestado,
          mockId,
        ]);
      });
  
      it('should throw an error if query fails', async () => {
        const mockId = 1;
        const mockProductView = {
          id_producto: 1,
          contador: 15,
          idestado: 1,
        };
  
        db.update.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(updateProductView(mockId, mockProductView)).rejects.toThrow('Database error');
      });
    });
  
    describe('deleteProductView', () => {
      it('should delete product view', async () => {
        const mockId = 1;
  
        db.deleteOne.mockResolvedValueOnce({});
  
        await deleteProductView(mockId);
  
        expect(db.deleteOne).toHaveBeenCalledWith(expect.any(String), [mockId]);
      });
  
      it('should throw an error if query fails', async () => {
        const mockId = 1;
  
        db.deleteOne.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(deleteProductView(mockId)).rejects.toThrow('Database error');
      });
    });
  });
  