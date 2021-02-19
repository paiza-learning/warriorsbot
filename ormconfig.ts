export default {
  type: 'postgres',
  host: process.env.DB_HOSTNAME || 'db',
  port: 5432,
  username: process.env.DB_USERNAME || 'paiza',
  password: process.env.DB_PASSWORD || 'learning',
  database: process.env.DB_DATABASE || 'warriors',
  synchronize: false,
  logging: false,
  entities: ['src/entities/**/*.ts'],
  migrations: ['db/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'db/migrations',
    subscribersDir: 'src/subscribers',
  },
  ssl: process.env.NODE_ENV === 'production',
  extra:
    process.env.NODE_ENV === 'production'
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {},
};
