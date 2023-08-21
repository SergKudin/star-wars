import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  // debug: true,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: process.env.NODE_ENV === 'development',  // true, //
  logging: process.env.NODE_ENV === 'development',
  migrations: [`${__dirname}/../db/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
}));


