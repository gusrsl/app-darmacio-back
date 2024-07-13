const {
    createProductRating,
    getAllProductRatings,
    getProductRatingById,
    updateProductRating,
    deleteProductRating,
  } = require('../service/valoracionesproductoService');
  const db = require('../config/db');
  
  // Mocking the db functions
  jest.mock('../config/db', () => ({
    executeQuery: jest.fn(),
    searchAll: jest.fn(),
    searchOne: jest.fn(),
    update: jest.fn(),
    deleteOne: jest.fn(),
  }));
  
  describe('Valoraciones Productos Service', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('createProductRating', () => {
      it('should create a new product rating', async () => {
        const mockProductRating = {
          id_producto: 1,
          valoracion: 5,
          idestado: 1,
        };
  
        db.executeQuery.mockResolvedValueOnce({});
  
        await createProductRating(mockProductRating);
  
        expect(db.executeQuery).toHaveBeenCalledWith(expect.any(String), [
          mockProductRating.id_producto,
          mockProductRating.valoracion,
          mockProductRating.idestado,
        ]);
      });
  
      it('should throw an error if query fails', async () => {
        const mockProductRating = {
          id_producto: 1,
          valoracion: 5,
          idestado: 1,
        };
  
        db.executeQuery.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(createProductRating(mockProductRating)).rejects.toThrow('Database error');
      });
    });
  
    describe('getAllProductRatings', () => {
      it('should return all product ratings', async () => {
        const mockProductRatings = [
          { id: 1, id_producto: 1, valoracion: 5, idestado: 1 },
          { id: 2, id_producto: 2, valoracion: 4, idestado: 1 },
        ];
  
        db.searchAll.mockResolvedValueOnce(mockProductRatings);
  
        const result = await getAllProductRatings();
  
        expect(db.searchAll).toHaveBeenCalledWith(expect.any(String));
        expect(result).toEqual(mockProductRatings);
      });
  
      it('should throw an error if query fails', async () => {
        db.searchAll.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(getAllProductRatings()).rejects.toThrow('Database error');
      });
    });
  
    describe('getProductRatingById', () => {
      it('should return product rating by id', async () => {
        const mockId = 1;
        const mockProductRating = { id: mockId, id_producto: 1, valoracion: 5, idestado: 1 };
  
        db.searchOne.mockResolvedValueOnce(mockProductRating);
  
        const result = await getProductRatingById(mockId);
  
        expect(db.searchOne).toHaveBeenCalledWith(expect.any(String), [mockId]);
        expect(result).toEqual(mockProductRating);
      });
  
      it('should throw an error if query fails', async () => {
        const mockId = 1;
  
        db.searchOne.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(getProductRatingById(mockId)).rejects.toThrow('Database error');
      });
    });
  
    describe('updateProductRating', () => {
      it('should update product rating and return updated product rating', async () => {
        const mockId = 1;
        const mockProductRating = {
          id_producto: 1,
          valoracion: 4,
          idestado: 1,
        };
  
        db.update.mockResolvedValueOnce({});
  
        await updateProductRating(mockId, mockProductRating);
  
        expect(db.update).toHaveBeenCalledWith(expect.any(String), [
          mockProductRating.id_producto,
          mockProductRating.valoracion,
          mockProductRating.idestado,
          mockId,
        ]);
      });
  
      it('should throw an error if query fails', async () => {
        const mockId = 1;
        const mockProductRating = {
          id_producto: 1,
          valoracion: 4,
          idestado: 1,
        };
  
        db.update.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(updateProductRating(mockId, mockProductRating)).rejects.toThrow('Database error');
      });
    });
  
    describe('deleteProductRating', () => {
      it('should delete product rating', async () => {
        const mockId = 1;
  
        db.deleteOne.mockResolvedValueOnce({});
  
        await deleteProductRating(mockId);
  
        expect(db.deleteOne).toHaveBeenCalledWith(expect.any(String), [mockId]);
      });
  
      it('should throw an error if query fails', async () => {
        const mockId = 1;
  
        db.deleteOne.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(deleteProductRating(mockId)).rejects.toThrow('Database error');
      });
    });
  });
  