require('dotenv').config();
//.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

const { Pool } = require('pg');

const config = {
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
};

const poolPromise = new Pool(config);

poolPromise.connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
        return poolPromise.query('SELECT NOW()');
    })
    .then(result => {
        console.log('Current time:', result.rows[0].now);
    })
    .catch(err => {
        console.error('Connection failed', err);
        console.log(config);
    });

module.exports = poolPromise;