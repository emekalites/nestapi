import fs = require('fs');
import { Seeder } from '@concepta/typeorm-seeding';
import { CountryFactory } from '../factory/country.factory';

export class CountrySeeder extends Seeder {
  async run() {
    const countries = JSON.parse(fs.readFileSync('src/database/seeds/json/countries.json', 'utf8'));
    for (const i in countries) {
      try {
        await this.factory(CountryFactory).create({
          ...countries[i],
          code: countries[i].iso2,
          phone_code: countries[i].phone_code,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
