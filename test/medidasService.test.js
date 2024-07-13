const { createMeasure, getAllMeasures, getMeasureById } = require('../service/medidasService');
const db = require('../config/db');

// Mocking the db functions
jest.mock('../config/db', () => ({
  executeQuery: jest.fn(),
  searchAll: jest.fn(),
  searchOne: jest.fn(),
}));

describe('Medidas Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMeasure', () => {
    it('should create a new measure', async () => {
      const mockMeasure = {
        descripcion: 'Kilogramo',
        abreviatura: 'kg',
        valido: true,
        idestado: 1,
      };

      db.executeQuery.mockResolvedValueOnce({});

      await createMeasure(mockMeasure);

      expect(db.executeQuery).toHaveBeenCalledWith(expect.any(String), [
        mockMeasure.descripcion,
        mockMeasure.abreviatura,
        mockMeasure.valido,
        mockMeasure.idestado,
      ]);
    });

    it('should throw an error if query fails', async () => {
      const mockMeasure = {
        descripcion: 'Kilogramo',
        abreviatura: 'kg',
        valido: true,
        idestado: 1,
      };

      db.executeQuery.mockRejectedValueOnce(new Error('Database error'));

      await expect(createMeasure(mockMeasure)).rejects.toThrow('Database error');
    });
  });

  describe('getAllMeasures', () => {
    it('should return all measures', async () => {
      const mockMeasures = [
        { id: 1, descripcion: 'Kilogramo', abreviatura: 'kg', valido: true, idestado: 1 },
        { id: 2, descripcion: 'Litro', abreviatura: 'l', valido: true, idestado: 1 },
      ];

      db.searchAll.mockResolvedValueOnce(mockMeasures);

      const result = await getAllMeasures();

      expect(db.searchAll).toHaveBeenCalledWith(expect.any(String));
      expect(result).toEqual(mockMeasures);
    });

    it('should throw an error if query fails', async () => {
      db.searchAll.mockRejectedValueOnce(new Error('Database error'));

      await expect(getAllMeasures()).rejects.toThrow('Database error');
    });
  });

  describe('getMeasureById', () => {
    it('should return measure by id', async () => {
      const mockId = 1;
      const mockMeasure = { id: mockId, descripcion: 'Kilogramo', abreviatura: 'kg', valido: true, idestado: 1 };

      db.searchOne.mockResolvedValueOnce(mockMeasure);

      const result = await getMeasureById(mockId);

      expect(db.searchOne).toHaveBeenCalledWith(expect.any(String), [mockId]);
      expect(result).toEqual(mockMeasure);
    });

    it('should throw an error if query fails', async () => {
      const mockId = 1;

      db.searchOne.mockRejectedValueOnce(new Error('Database error'));

      await expect(getMeasureById(mockId)).rejects.toThrow('Database error');
    });
  });
});
