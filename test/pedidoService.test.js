const {
    createPedido,
    getPedidoById,
    getAllPedidos,
    updatePedido,
    deletePedido,
    togglePedidoEstado,
    getPedidosReport,
  } = require('../service/pedidosService');
  const db = require('../config/db');
  
  // Mocking the db functions
  jest.mock('../config/db', () => ({
    poolPromise: {
      connect: jest.fn(),
      query: jest.fn(),
    },
  }));
  
  describe('Pedido Service', () => {
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
  
    // describe('createPedido', () => {
    //   it('should create a new pedido and its details', async () => {
    //     const mockPedido = {
    //       user_id: 1,
    //       estado: 'pendiente',
    //       subtotal: 100,
    //       total: 120,
    //       idestado: 1,
    //       producto_ids: [1, 2, 3],
    //     };
  
    //     const mockResult = {
    //       rows: [{ id: 1, fecha_pedido: '2021-01-01', estado: 'pendiente', subtotal: 100, total: 120, idestado: 1 }],
    //     };
  
    //     client.query
    //       .mockResolvedValueOnce(mockResult) // Result for the main pedido
    //       .mockResolvedValueOnce({}); // Result for the detalle_pedidos inserts
  
    //     const result = await createPedido(mockPedido);
  
    //     expect(client.query).toHaveBeenCalledTimes(5);
    //     expect(client.query).toHaveBeenCalledWith(expect.any(String), [mockPedido.user_id, mockPedido.estado, mockPedido.subtotal, mockPedido.total, mockPedido.idestado]);
    //     mockPedido.producto_ids.forEach(producto_id => {
    //       expect(client.query).toHaveBeenCalledWith(expect.any(String), [1, producto_id]);
    //     });
    //     expect(result).toEqual({ id: 1, ...mockResult.rows[0] });
    //   });
  
    //   it('should rollback if any error occurs', async () => {
    //     const mockPedido = {
    //       user_id: 1,
    //       estado: 'pendiente',
    //       subtotal: 100,
    //       total: 120,
    //       idestado: 1,
    //       producto_ids: [1, 2, 3],
    //     };
  
    //     client.query.mockRejectedValueOnce(new Error('Database error'));
  
    //     await expect(createPedido(mockPedido)).rejects.toThrow('Database error');
    //     expect(client.query).toHaveBeenCalledWith('ROLLBACK');
    //   });
    // });
  
    describe('getPedidoById', () => {
      it('should return pedido by id', async () => {
        const mockId = 1;
        const mockPedidos = [
          { id: mockId, user_id: 1, estado: 'pendiente', subtotal: 100, total: 120, idestado: 1 },
        ];
  
        db.poolPromise.query.mockResolvedValueOnce({ rows: mockPedidos });
  
        const result = await getPedidoById(mockId);
  
        expect(db.poolPromise.query).toHaveBeenCalledWith(expect.any(String), [mockId]);
        expect(result).toEqual(mockPedidos);
      });
  
      it('should throw an error if query fails', async () => {
        const mockId = 1;
  
        db.poolPromise.query.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(getPedidoById(mockId)).rejects.toThrow('Database error');
      });
    });
  
    describe('getAllPedidos', () => {
      it('should return all pedidos', async () => {
        const mockPedidos = [
          { id: 1, user_id: 1, estado: 'pendiente', subtotal: 100, total: 120, idestado: 1 },
          { id: 2, user_id: 2, estado: 'entregado', subtotal: 150, total: 180, idestado: 1 },
        ];
  
        db.poolPromise.query.mockResolvedValueOnce({ rows: mockPedidos });
  
        const result = await getAllPedidos();
  
        expect(db.poolPromise.query).toHaveBeenCalledWith(expect.any(String));
        expect(result).toEqual(mockPedidos);
      });
  
      it('should throw an error if query fails', async () => {
        db.poolPromise.query.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(getAllPedidos()).rejects.toThrow('Database error');
      });
    });
  
    describe('updatePedido', () => {
      it('should update pedido and return updated pedido', async () => {
        const mockId = 1;
        const updatedFields = { estado: 'entregado', total: 130 };
        const mockUpdatedPedido = { id: mockId, user_id: 1, estado: 'entregado', subtotal: 100, total: 130, idestado: 1 };
  
        db.poolPromise.query.mockResolvedValueOnce({ rows: [mockUpdatedPedido] });
  
        const result = await updatePedido(mockId, updatedFields);
  
        expect(db.poolPromise.query).toHaveBeenCalledWith(expect.any(String), [mockId, updatedFields.estado, updatedFields.total]);
        expect(result).toEqual(mockUpdatedPedido);
      });
  
      it('should throw an error if query fails', async () => {
        const mockId = 1;
        const updatedFields = { estado: 'entregado', total: 130 };
  
        db.poolPromise.query.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(updatePedido(mockId, updatedFields)).rejects.toThrow('Database error');
      });
    });
  
    describe('deletePedido', () => {
      it('should delete pedido and its details', async () => {
        const mockId = 1;
  
        client.query.mockResolvedValue({});
  
        await deletePedido(mockId);
  
        expect(client.query).toHaveBeenCalledTimes(4); // BEGIN, DELETE FROM detalle_pedidos, DELETE FROM prc_pedidos, COMMIT
        expect(client.query).toHaveBeenCalledWith('BEGIN');
        expect(client.query).toHaveBeenCalledWith('DELETE FROM detalle_pedidos WHERE pedido_id = $1', [mockId]);
        expect(client.query).toHaveBeenCalledWith('DELETE FROM prc_pedidos WHERE id = $1', [mockId]);
        expect(client.query).toHaveBeenCalledWith('COMMIT');
      });
  
      it('should rollback if any error occurs', async () => {
        const mockId = 1;
  
        client.query.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(deletePedido(mockId)).rejects.toThrow('Database error');
        expect(client.query).toHaveBeenCalledWith('ROLLBACK');
      });
    });
  
    describe('togglePedidoEstado', () => {
      it('should toggle pedido estado and return updated pedido', async () => {
        const mockId = 1;
        const mockCurrentEstado = { estado: 'pendiente' };
        const mockUpdatedPedido = { id: mockId, estado: 'entregado' };
  
        client.query.mockResolvedValueOnce({ rows: [mockCurrentEstado] }).mockResolvedValueOnce({ rows: [mockUpdatedPedido] });
  
        const result = await togglePedidoEstado(mockId);
  
        expect(client.query).toHaveBeenCalledTimes(2);
        expect(client.query).toHaveBeenCalledWith('SELECT estado FROM prc_pedidos WHERE id = $1', [mockId]);
        expect(client.query).toHaveBeenCalledWith('UPDATE prc_pedidos SET estado = $1 WHERE id = $2 RETURNING *', ['entregado', mockId]);
        expect(result).toEqual(mockUpdatedPedido);
      });
  
      it('should throw an error if query fails', async () => {
        const mockId = 1;
  
        client.query.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(togglePedidoEstado(mockId)).rejects.toThrow('Database error');
      });
    });
  
    describe('getPedidosReport', () => {
      it('should return pedidos report', async () => {
        const mockReport = [
          {
            id: 1,
            nombre_completo: 'Test User',
            fecha_pedido: '2021-01-01',
            estado: 'pendiente',
            ciudad: 'Test City',
            correo: 'test@example.com',
            codigopostal: '12345',
            direccion: '123 Test St',
            subtotal: 100,
            total: 120,
            productos: [1, 2, 3],
          },
        ];
  
        client.query.mockResolvedValueOnce({ rows: mockReport });
  
        const result = await getPedidosReport();
  
        expect(client.query).toHaveBeenCalledWith(expect.any(String));
        expect(result).toEqual(mockReport);
      });
  
      it('should throw an error if query fails', async () => {
        client.query.mockRejectedValueOnce(new Error('Database error'));
  
        await expect(getPedidosReport()).rejects.toThrow('Database error');
      });
    });
  });
  