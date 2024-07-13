const { createProductImage, getAllProductImages, getProductImageById } = require('../service/productoimagenesService');
const db = require('../config/db');

// Mocking the db functions
jest.mock('../config/db', () => ({
  executeQuery: jest.fn(),
  searchAll: jest.fn(),
  searchOne: jest.fn(),
}));

describe('Product Image Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProductImage', () => {
    it('should call executeQuery with correct parameters', async () => {
      const mockProductImage = {
        id_producto: 1,
        id_imagen: 2,
        valido: true,
        idestado: 1,
      };

      db.executeQuery.mockResolvedValueOnce({});

      await createProductImage(mockProductImage);

      expect(db.executeQuery).toHaveBeenCalledWith(expect.any(String), [
        mockProductImage.id_producto,
        mockProductImage.id_imagen,
        mockProductImage.valido,
        mockProductImage.idestado,
      ]);
    });

    it('should throw an error if executeQuery fails', async () => {
      const mockProductImage = {
        id_producto: 1,
        id_imagen: 2,
        valido: true,
        idestado: 1,
      };

      db.executeQuery.mockRejectedValueOnce(new Error('Database error'));

      await expect(createProductImage(mockProductImage)).rejects.toThrow('Database error');
    });
  });

  describe('getAllProductImages', () => {
    it('should call searchAll and return all product images', async () => {
      const mockProductImages = [
        { id_producto: 1, id_imagen: 1, valido: true, idestado: 1 },
        { id_producto: 2, id_imagen: 2, valido: true, idestado: 1 },
      ];

      db.searchAll.mockResolvedValueOnce(mockProductImages);

      const result = await getAllProductImages();

      expect(db.searchAll).toHaveBeenCalledWith(expect.any(String));
      expect(result).toEqual(mockProductImages);
    });

    it('should throw an error if searchAll fails', async () => {
      db.searchAll.mockRejectedValueOnce(new Error('Database error'));

      await expect(getAllProductImages()).rejects.toThrow('Database error');
    });
  });

  describe('getProductImageById', () => {
    it('should call searchAll with correct parameters and return product images', async () => {
      const mockId = 1;
      const mockProductImages = [
        { id_producto: mockId, id_imagen: 1, ruta_img: 'image1.jpg' },
        { id_producto: mockId, id_imagen: 2, ruta_img: 'image2.jpg' },
      ];

      db.searchAll.mockResolvedValueOnce(mockProductImages);

      const result = await getProductImageById(mockId);

      expect(db.searchAll).toHaveBeenCalledWith(expect.any(String), [mockId]);
      expect(result).toEqual(mockProductImages);
    });

    it('should return default image object if no image is found', async () => {
      const mockId = 1;

      db.searchAll.mockResolvedValueOnce(null);

      const result = await getProductImageById(mockId);

      expect(db.searchAll).toHaveBeenCalledWith(expect.any(String), [mockId]);
      expect(result).toEqual({ ruta_img: 'noimage.jpg' });
    });

    it('should throw an error if searchAll fails', async () => {
      const mockId = 1;

      db.searchAll.mockRejectedValueOnce(new Error('Database error'));

      await expect(getProductImageById(mockId)).rejects.toThrow('Database error');
    });
  });
});
