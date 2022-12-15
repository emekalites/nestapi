import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default registerAs('database', () => ({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
}));
