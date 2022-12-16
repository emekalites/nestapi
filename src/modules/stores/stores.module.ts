import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from './entities/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../utility/entities/country.entity';
import { State } from '../utility/entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, State, Country])],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
