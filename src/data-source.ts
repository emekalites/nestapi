import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DATABASE'),
  migrationsTableName: 'migrations',
  entities: [path.resolve(__dirname + '/../dist/**/*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname + '/../dist/database/migration/*{.ts,.js}')],
  synchronize: false,
  logging: configService.get<string>('MODE') === 'development',
  uuidExtension: 'pgcrypto',
});
