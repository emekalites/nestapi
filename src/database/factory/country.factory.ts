import { Factory } from '@concepta/typeorm-seeding';
import { Country } from '../../modules/utility/entities/country.entity';

export class CountryFactory extends Factory<Country> {
  protected async entity(): Promise<Country> {
    const country = new Country();
    country.id = null;
    country.name = '';
    country.code = '';
    country.phone_code = '';
    return country;
  }
}
