const {
    createProductMeasure,
    getAllProductMeasures,
    getProductMeasureById,
  } = require('../service/productosmedidasService');
  const db = require('../config/db');
  
  // Mocking the db functions
  jest.mock('../config/db', () => ({
    executeQuery: jest.fn(),
    searchAll: jest.fn(),
    searchOne: jest.fn(),
  }));
  
  describe('Productos Medidas Service', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('createProductMeasure', () => {
      it('should create a new product measure', async () => {
        const mockProductMeasure = {
          id_producto: 1,
          id_medida: 1,
          valido: true,
          existencia: 100,
          idestado: 1,
        };
  
        db.executeQuery.mockResolvedValueOnce({});
  
        await createProductMeasure(mockProductMeasure);
  
        expect(db.executeQuery).toHaveBeenCalledWith(expect.any(String), [
          mockProductMeasure.id_producto,
          mockProductMeasure.id_medida,
          mockProductMeasure.valido,
          mockProductMeasure.existencia,
          mockProductMeasure.idestado,
        ]);
      });
  
      it('should throw an error if query fails', async () => {
        const mockProductMeasure = {
          id_producto: 1,
          id_medida: 1,
          valido: true,
          existencia: 100,
          idestado: 1,
        };
  
        db.executeQuery.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(createProductMeasure(mockProductMeasure)).rejects.toThrow('Database error');
      });
    });
  
    describe('getAllProductMeasures', () => {
      it('should return all product measures', async () => {
        const mockProductMeasures = [
          { id: 1, id_producto: 1, id_medida: 1, valido: true, existencia: 100, idestado: 1 },
          { id: 2, id_producto: 2, id_medida: 2, valido: true, existencia: 200, idestado: 1 },
        ];
  
        db.searchAll.mockResolvedValueOnce(mockProductMeasures);
  
        const result = await getAllProductMeasures();
  
        expect(db.searchAll).toHaveBeenCalledWith(expect.any(String));
        expect(result).toEqual(mockProductMeasures);
      });
  
      it('should throw an error if query fails', async () => {
        db.searchAll.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(getAllProductMeasures()).rejects.toThrow('Database error');
      });
    });
  
    describe('getProductMeasureById', () => {
      it('should return product measure by id', async () => {
        const mockId = 1;
        const mockProductMeasure = { id: mockId, id_producto: 1, id_medida: 1, valido: true, existencia: 100, idestado: 1 };
  
        db.searchOne.mockResolvedValueOnce(mockProductMeasure);
  
        const result = await getProductMeasureById(mockId);
  
        expect(db.searchOne).toHaveBeenCalledWith(expect.any(String), [mockId]);
        expect(result).toEqual(mockProductMeasure);
      });
  
      it('should throw an error if query fails', async () => {
        const mockId = 1;
  
        db.searchOne.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(getProductMeasureById(mockId)).rejects.toThrow('Database error');
      });
    });
  });
  