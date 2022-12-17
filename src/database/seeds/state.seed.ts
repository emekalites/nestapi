import fs = require('fs');
import { Seeder } from '@concepta/typeorm-seeding';
import { StateFactory } from '../factory/state.factory';
import dataSource from '../../data-source';
import { Country } from '../../modules/utility/entities/country.entity';

export class StateSeeder extends Seeder {
  async run() {
    const states = JSON.parse(fs.readFileSync('src/database/seeds/json/states.json', 'utf8'));
    for (const i in states) {
      try {
        const country = await dataSource.manager.getRepository(Country).findOneBy({ id: states[i].country_id });

        if (country) {
          await this.factory(StateFactory).create({
            name: states[i].name,
            code: `${states[i].state_code}${country.code}`,
            country,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
