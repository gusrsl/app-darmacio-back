const { createUser, findUser, getAllUsers, updateUser, deleteUser } = require('../service/userService');
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Mocking the executeQuery and other db functions
jest.mock('../config/db', () => ({
  executeQuery: jest.fn(),
  searchOne: jest.fn(),
  searchAll: jest.fn(),
}));

// Mocking bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

// Supress console.error during tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalConsoleError;
});

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should hash the password and call executeQuery with correct parameters', async () => {
      const mockUser = {
        nombreUsuario: 'testuser',
        contrasena: 'password123',
        correo: 'test@example.com',
        nombre: 'Test',
        apellido: 'User',
        direccion: '123 Test St',
        ciudad: 'Test City',
        pais: 'Test Country',
        codigoPostal: '12345',
        telefono: '123-456-7890',
      };

      const hashedPassword = 'hashedPassword123';
      bcrypt.hash.mockResolvedValueOnce(hashedPassword);
      db.executeQuery.mockResolvedValueOnce({});

      await createUser(mockUser);

      expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.contrasena, 10);
      expect(db.executeQuery).toHaveBeenCalledWith(expect.any(String), [
        mockUser.nombreUsuario,
        hashedPassword,
        mockUser.correo,
        mockUser.nombre,
        mockUser.apellido,
        mockUser.direccion,
        mockUser.ciudad,
        mockUser.pais,
        mockUser.codigoPostal,
        mockUser.telefono,
      ]);
    });

    it('should throw an error if executeQuery fails', async () => {
      const mockUser = {
        nombreUsuario: 'testuser',
        contrasena: 'password123',
        correo: 'test@example.com',
        nombre: 'Test',
        apellido: 'User',
        direccion: '123 Test St',
        ciudad: 'Test City',
        pais: 'Test Country',
        codigoPostal: '12345',
        telefono: '123-456-7890',
      };

      bcrypt.hash.mockResolvedValueOnce('hashedPassword123');
      db.executeQuery.mockRejectedValueOnce(new Error('Database error'));

      await expect(createUser(mockUser)).rejects.toThrow('Database error');
    });
  });

  describe('findUser', () => {
    it('should call searchOne with correct parameters and return the user', async () => {
      const mockUsername = 'testuser';
      const mockUser = {
        nombreUsuario: mockUsername,
        correo: 'test@example.com',
        nombre: 'Test',
        apellido: 'User',
      };

      db.searchOne.mockResolvedValueOnce(mockUser);

      const result = await findUser(mockUsername);

      expect(db.searchOne).toHaveBeenCalledWith(expect.any(String), [mockUsername]);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if searchOne fails', async () => {
      const mockUsername = 'testuser';
      db.searchOne.mockRejectedValueOnce(new Error('Database error'));

      await expect(findUser(mockUsername)).rejects.toThrow('Database error');
    });
  });

  describe('getAllUsers', () => {
    it('should call searchAll and return all users', async () => {
      const mockUsers = [
        { nombreUsuario: 'user1', correo: 'user1@example.com' },
        { nombreUsuario: 'user2', correo: 'user2@example.com' },
      ];

      db.searchAll.mockResolvedValueOnce(mockUsers);

      const result = await getAllUsers();

      expect(db.searchAll).toHaveBeenCalledWith(expect.any(String));
      expect(result).toEqual(mockUsers);
    });

    it('should throw an error if searchAll fails', async () => {
      db.searchAll.mockRejectedValueOnce(new Error('Database error'));

      await expect(getAllUsers()).rejects.toThrow('Database error');
    });
  });

  describe('updateUser', () => {
    it('should hash the password and call executeQuery with correct parameters', async () => {
      const mockUser = {
        nombreUsuario: 'testuser',
        contrasena: 'password123',
        correo: 'test@example.com',
        nombre: 'Test',
        apellido: 'User',
        direccion: '123 Test St',
        ciudad: 'Test City',
        pais: 'Test Country',
        codigoPostal: '12345',
        telefono: '123-456-7890',
      };

      const hashedPassword = 'hashedPassword123';
      bcrypt.hash.mockResolvedValueOnce(hashedPassword);
      db.executeQuery.mockResolvedValueOnce({});

      await updateUser(mockUser);

      expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.contrasena, 10);
      expect(db.executeQuery).toHaveBeenCalledWith(expect.any(String), [
        hashedPassword,
        mockUser.correo,
        mockUser.nombre,
        mockUser.apellido,
        mockUser.direccion,
        mockUser.ciudad,
        mockUser.pais,
        mockUser.codigoPostal,
        mockUser.telefono,
        mockUser.nombreUsuario,
      ]);
    });

    it('should throw an error if executeQuery fails', async () => {
      const mockUser = {
        nombreUsuario: 'testuser',
        contrasena: 'password123',
        correo: 'test@example.com',
        nombre: 'Test',
        apellido: 'User',
        direccion: '123 Test St',
        ciudad: 'Test City',
        pais: 'Test Country',
        codigoPostal: '12345',
        telefono: '123-456-7890',
      };

      bcrypt.hash.mockResolvedValueOnce('hashedPassword123');
      db.executeQuery.mockRejectedValueOnce(new Error('Database error'));

      await expect(updateUser(mockUser)).rejects.toThrow('Database error');
    });
  });

  describe('deleteUser', () => {
    it('should call executeQuery with correct parameters', async () => {
      const mockUsername = 'testuser';

      db.executeQuery.mockResolvedValueOnce({});

      await deleteUser(mockUsername);

      expect(db.executeQuery).toHaveBeenCalledWith(expect.any(String), [mockUsername]);
    });

    it('should throw an error if executeQuery fails', async () => {
      const mockUsername = 'testuser';

      db.executeQuery.mockRejectedValueOnce(new Error('Database error'));

      await expect(deleteUser(mockUsername)).rejects.toThrow('Database error');
    });
  });
});
