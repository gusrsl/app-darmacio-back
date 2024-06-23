//.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

const { Pool } = require('pg')
const { configEnv } = require('../config')

const config = {
  // user: configEnv.USERDB,
  password: configEnv.PASSWORD,
  host: configEnv.HOST,
  database: configEnv.DATABASE,
}

const poolPromise = new Pool(config)

poolPromise
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL')
    return poolPromise.query('SELECT NOW()')
  })
  .then((result) => {
    console.log('Current time:', result.rows[0].now)
  })
  .catch((err) => {
    console.error('Connection failed', err)
  })

const executeQuery = async (text, params) => {
  try {
    const result = await poolPromise.query(text, params)

    return result
  } catch (error) {
    throw error
  }
}

const searchAll = async (text, params) => {
  try {
    const result = await executeQuery(text, params)

    return result.rows
  } catch (error) {
    throw error
  }
}

const searchOne = async (text, params) => {
  try {
    const result = await executeQuery(text, params)

    return result.rows[0] ?? null
  } catch (error) {
    throw error
  }
}

const update = async (text, params) => {
  try {
    await executeQuery(text, params)
  } catch (error) {
    throw error
  }
}

const deleteOne = async (text, params) => {
  try {
    await executeQuery(text, params)
  } catch (error) {
    throw error
  }
}

module.exports = {
  poolPromise,
  executeQuery,
  searchAll,
  searchOne,
  update,
  deleteOne,
}
