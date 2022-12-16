import { Seeder } from '@concepta/typeorm-seeding';
import { CountrySeeder } from './country.seed';
import { StateSeeder } from './state.seed';

export class DatabaseSeeder extends Seeder {
  async run() {
    await this.call([CountrySeeder, StateSeeder]);
  }
}
