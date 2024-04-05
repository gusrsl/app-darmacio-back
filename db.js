const sql = require('mssql');

const config = {
    user: 'gusadmin',
    password: 'gusadmin',
    server: 'localhost', 
    database: 'dbshop',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const poolPromise = sql.connect(config);

poolPromise
    .then(() => console.log('Connected to SQL Server'))
    .catch(err => console.error('Connection failed', err));

module.exports = poolPromise;