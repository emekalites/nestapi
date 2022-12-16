import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { State } from './entities/state.entity';

@Injectable()
export class UtilityService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}

  async findCountries(): Promise<Country[]> {
    return await this.countryRepository.find();
  }

  async findStates(id: number): Promise<State[]> {
    const country = await this.countryRepository.findOneBy({ id });

    return await this.stateRepository.find({ where: { country: { id: country.id } }, relations: ['country'] });
  }
}
