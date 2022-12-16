import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Country } from './entities/country.entity';
import { State } from './entities/state.entity';
import { UtilityService } from './utility.service';

@ApiTags('Utility')
@Controller('utility')
export class UtilityController {
  constructor(private readonly utilityService: UtilityService) {}

  @Get('countries')
  findCountries(): Promise<Country[]> {
    return this.utilityService.findCountries();
  }

  @Get('states/:id')
  findStates(@Param('id') id: string): Promise<State[]> {
    return this.utilityService.findStates(+id);
  }
}
