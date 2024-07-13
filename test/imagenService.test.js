const path = require('path');
const fs = require('fs');
const {
  uploadImage,
  deleteImage,
  getImageById,
  getProductImages,
} = require('../service/imagenesService');
const db = require('../config/db');

// Mocking the db functions and fs functions
jest.mock('../config/db', () => ({
  poolPromise: {
    connect: jest.fn(),
    query: jest.fn(),
  },
}));

jest.mock('fs', () => ({
  unlinkSync: jest.fn(),
  existsSync: jest.fn().mockReturnValue(true),
}));

describe('Imagen Service', () => {
  let client;

  beforeEach(() => {
    client = {
      query: jest.fn(),
      release: jest.fn(),
    };
    db.poolPromise.connect.mockResolvedValue(client);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadImage', () => {
    it('should upload image and insert records in database', async () => {
      const mockReq = {
        body: { productId: 1 },
        file: { filename: 'test.jpg', mimetype: 'image/jpeg', size: 1024 },
      };
      const mockResult = { rows: [{ id: 1 }] };

      client.query
        .mockResolvedValueOnce(mockResult) // For inserting image
        .mockResolvedValueOnce({}); // For inserting relation

      const result = await uploadImage(mockReq);

      expect(client.query).toHaveBeenCalledTimes(2);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        mockReq.file.filename,
        mockReq.file.mimetype,
        mockReq.file.size,
      ]);
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        mockReq.body.productId,
        1,
      ]);
      expect(result).toEqual({ imageId: 1, productId: mockReq.body.productId });
    });

    it('should throw an error if productId is missing', async () => {
      const mockReq = {
        body: {},
        file: { filename: 'test.jpg', mimetype: 'image/jpeg', size: 1024 },
      };

      await expect(uploadImage(mockReq)).rejects.toThrow(
        'El ID del producto es requerido'
      );
    });

    it('should throw an error if query fails', async () => {
      const mockReq = {
        body: { productId: 1 },
        file: { filename: 'test.jpg', mimetype: 'image/jpeg', size: 1024 },
      };

      client.query.mockRejectedValueOnce(new Error('Database error'));

      await expect(uploadImage(mockReq)).rejects.toThrow('Database error');
    });
  });

//   describe('deleteImage', () => {
//     it('should delete image and its relationships', async () => {
//       const mockId = 1;
//       const mockSelectResult = { rows: [{ nombre_archivo: 'test.jpg' }] };

//       client.query
//         .mockResolvedValueOnce(mockSelectResult) // For selecting image
//         .mockResolvedValueOnce({}) // For deleting relation
//         .mockResolvedValueOnce({}); // For deleting image

//       await deleteImage(mockId);

//       expect(client.query).toHaveBeenCalledTimes(4);
//       expect(client.query).toHaveBeenCalledWith('BEGIN');
//       expect(client.query).toHaveBeenCalledWith(expect.any(String), [mockId]);
//       expect(client.query).toHaveBeenCalledWith(expect.any(String), [mockId]);
//       expect(client.query).toHaveBeenCalledWith(expect.any(String), [mockId]);
//       expect(client.query).toHaveBeenCalledWith('COMMIT');
//       expect(fs.unlinkSync).toHaveBeenCalledWith(
//         path.join(__dirname, '../uploads', 'test.jpg')
//       );
//     });

//     it('should rollback if query fails', async () => {
//       const mockId = 1;

//       client.query.mockRejectedValueOnce(new Error('Database error'));

//       await expect(deleteImage(mockId)).rejects.toThrow('Database error');
//       expect(client.query).toHaveBeenCalledWith('ROLLBACK');
//     });

//     it('should throw an error if image not found', async () => {
//       const mockId = 1;

//       client.query.mockResolvedValueOnce({ rows: [] });

//       await expect(deleteImage(mockId)).rejects.toThrow('Imagen no encontrada');
//     });
//   });

  describe('getImageById', () => {
    it('should return file path if image exists', async () => {
      const mockId = 1;
      const mockResult = { rows: [{ nombre_archivo: 'test.jpg' }] };

      client.query.mockResolvedValueOnce(mockResult);

      const result = await getImageById(mockId);

      expect(client.query).toHaveBeenCalledWith(expect.any(String), [mockId]);
      expect(result).toEqual(path.join(__dirname, '../uploads', 'test.jpg'));
    });

    it('should throw an error if image not found', async () => {
      const mockId = 1;

      client.query.mockResolvedValueOnce({ rows: [] });

      await expect(getImageById(mockId)).rejects.toThrow('Imagen no encontrada');
    });

    it('should throw an error if file does not exist', async () => {
      const mockId = 1;
      const mockResult = { rows: [{ nombre_archivo: 'test.jpg' }] };

      client.query.mockResolvedValueOnce(mockResult);
      fs.existsSync.mockReturnValueOnce(false);

      await expect(getImageById(mockId)).rejects.toThrow(
        'Archivo de imagen no encontrado'
      );
    });
  });

  describe('getProductImages', () => {
    it('should return image URLs for a product', async () => {
      const mockReq = {
        params: { productId: 1 },
        protocol: 'http',
        get: jest.fn().mockReturnValue('localhost:3000'),
      };
      const mockResult = {
        rows: [
          { id: 1, nombre_archivo: 'image1.jpg' },
          { id: 2, nombre_archivo: 'image2.jpg' },
        ],
      };

      client.query.mockResolvedValueOnce(mockResult);

      const result = await getProductImages(mockReq);

      expect(client.query).toHaveBeenCalledWith(expect.any(String), [
        mockReq.params.productId,
      ]);
      expect(result).toEqual([
        'http://localhost:3000/imagenes/image/1',
        'http://localhost:3000/imagenes/image/2',
      ]);
    });

    it('should throw an error if no images found for product', async () => {
      const mockReq = {
        params: { productId: 1 },
        protocol: 'http',
        get: jest.fn().mockReturnValue('localhost:3000'),
      };

      client.query.mockResolvedValueOnce({ rows: [] });

      await expect(getProductImages(mockReq)).rejects.toThrow(
        'El producto no tiene asociada ninguna imagen'
      );
    });

    it('should throw an error if query fails', async () => {
      const mockReq = {
        params: { productId: 1 },
        protocol: 'http',
        get: jest.fn().mockReturnValue('localhost:3000'),
      };

      client.query.mockRejectedValueOnce(new Error('Database error'));

      await expect(getProductImages(mockReq)).rejects.toThrow('Database error');
    });
  });
});
