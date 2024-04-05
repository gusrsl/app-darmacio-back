const bcrypt = require('bcrypt');
const db = require('../db');

async function register(nombreUsuario, contrasena, correo, nombre, apellido, direccion, ciudad, pais, codigoPostal, telefono) {
    try {
        const contrasenaHashed = await bcrypt.hash(contrasena, 10);
        const pool = await db;
        const request = pool.request();
        await request.query(`INSERT INTO Usuarios (NombreUsuario, Contrasena, Correo, Nombre, Apellido, Direccion, Ciudad, Pais, CodigoPostal, Telefono, FechaCreacion, EstaActivo) VALUES ('${nombreUsuario}', '${contrasenaHashed}', '${correo}', '${nombre}', '${apellido}', '${direccion}', '${ciudad}', '${pais}', '${codigoPostal}', '${telefono}', GETDATE(), 1)`);
        return { message: 'Created' };
    } catch (err) {
        if (err.message.includes('UQ__Usuarios__6B0F5AE0422E5BE1')) {
            throw new Error('El nombre de usuario ya existe');
        } else {
            throw err;
        }
    }
}

async function findUser(nombreUsuario) {
    const pool = await db;
    const request = pool.request();
    const result = await request.query(`SELECT * FROM Usuarios WHERE NombreUsuario = '${nombreUsuario}'`);
    return result.recordset[0];
}

module.exports = {
    register,
    findUser
};