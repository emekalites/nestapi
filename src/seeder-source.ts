import { SeedingSource } from '@concepta/typeorm-seeding';
import * as dotenv from 'dotenv';
import dataSource from './data-source';
import { DatabaseSeeder } from './database/seeds/database.seed';

dotenv.config();

export default new SeedingSource({
  dataSource,
  seeders: [DatabaseSeeder],
});
