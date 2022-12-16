import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationOptions } from '../../common/interface/pagination.options.interface';
import { Raw, Repository } from 'typeorm';
import { Country } from '../utility/entities/country.entity';
import { State } from '../utility/entities/state.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { SearchParams } from '../../common/interface/search-params.interface';
import { Pagination } from '../../common/interface/paginate.result.interface';
import { DistanceDto } from './dto/distance.dto';
import * as geolib from 'geolib';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(storeDto: CreateStoreDto) {
    try {
      const { state_id, country_id } = storeDto;

      const state: State = await this.stateRepository.findOneBy({ id: state_id });

      const country: Country = await this.countryRepository.findOneBy({ id: country_id });

      const store = await this.storeRepository.save({ ...storeDto, state, country });

      return { success: true, data: store };
    } catch (e) {
      console.log(e);
      throw new BadRequestException({ success: false, message: e.message });
    }
  }

  async findAll(options: PaginationOptions, params: SearchParams): Promise<Pagination> {
    const { q } = params;

    const page = options.page - 1;

    let where = {};

    if (q && q !== '') {
      where = { ...where, name: Raw((alias) => `LOWER(${alias}) Like '%${q.toLowerCase()}%'`) };
    }

    const [result, total] = await this.storeRepository.findAndCount({
      where,
      relations: ['state', 'country'],
      order: { name: 'ASC' },
      take: options.limit,
      skip: page * options.limit,
    });

    return {
      result,
      lastPage: Math.ceil(total / options.limit),
      itemsPerPage: options.limit,
      totalPages: total,
      currentPage: options.page,
    };
  }

  async findOne(id: number) {
    try {
      const store = await this.storeRepository.findOneBy({ id });
      if (!store) {
        throw new BadRequestException('store not found!');
      }

      return { success: true, data: store };
    } catch (e) {
      console.log(e);
      throw new BadRequestException({ success: false, message: e.message });
    }
  }

  async distance(distanceDto: DistanceDto) {
    try {
      const location = distanceDto.location.split(':');
      const destination = distanceDto.destination.split(':');

      const distance = geolib.getDistance(
        { latitude: location[0], longitude: location[1] },
        { latitude: destination[0], longitude: destination[1] },
      );

      return { success: true, data: distance / 1000 };
    } catch (e) {
      console.log(e);
      throw new BadRequestException({ success: false, message: e.message });
    }
  }

  async update(id: number, storeDto: UpdateStoreDto) {
    try {
      const store = await this.storeRepository.findOneBy({ id });
      if (!store) {
        throw new BadRequestException('store not found!');
      }

      const { name, address, city, state_id, country_id, location } = storeDto;

      const state: State = await this.stateRepository.findOneBy({ id: state_id });

      const country: Country = await this.countryRepository.findOneBy({ id: country_id });

      store.name = name;
      store.address = address;
      store.city = city;
      store.state = state;
      store.country = country;
      store.location = location;
      const rs = await store.save();

      return { success: true, data: rs };
    } catch (e) {
      console.log(e);
      throw new BadRequestException({ success: false, message: e.message });
    }
  }

  async remove(id: number) {
    try {
      const store = await this.storeRepository.findOneBy({ id });

      if (!store) {
        throw new NotFoundException('store not found');
      }

      await this.storeRepository.softDelete({ id });

      return { success: true, data: store };
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message || 'delete failed');
    }
  }
}
