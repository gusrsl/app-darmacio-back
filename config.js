const envSchema = require('env-schema')
const Ajv = require('ajv')

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  validateFormats: true,
  coerceTypes: true,
  useDefaults: true,
})

const schema = {
  type: 'object',
  properties: {
    USERDB: {
      type: 'string',
      default: 'postgres',
      description: 'Database user',
    },
    PASSWORD: {
      type: 'string',
      default: 'postgres',
      description: 'Database password',
    },
    HOST: {
      type: 'string',
      default: 'localhost',
      description: 'Database host',
    },
    DATABASE: {
      type: 'string',
      default: 'test',
      description: 'Database name',
    },
    PORT: {
      type: 'number',
      default: 3000,
      description: 'Port to listen on',
    },
    JWT_SECRET: {
      type: 'string',
      default: 'secret',
      description: 'JWT secret key',
    },
  },
}

const config = envSchema({
  schema: {
    ...schema,
    required: Object.keys(schema.properties),
  },
  dotenv: true,
  ajv,
})

module.exports = {
  configEnv: config,
}
