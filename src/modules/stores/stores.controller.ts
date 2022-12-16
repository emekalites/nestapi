import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SearchParams } from '../../common/interface/search-params.interface';
import { Pagination } from '../../common/interface/paginate.result.interface';
import { DistanceDto } from './dto/distance.dto';

@ApiTags('Stores')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@Body() storeDto: CreateStoreDto) {
    return this.storesService.create(storeDto);
  }

  @Get()
  @ApiQuery({ name: 'q', type: String, description: 'search query', required: false })
  @ApiQuery({ name: 'limit', type: Number, description: 'pagination limit', example: '10' })
  @ApiQuery({ name: 'page', type: Number, description: 'current page', example: '1' })
  findAll(@Query() params: SearchParams, @Req() req): Promise<Pagination> {
    const limit = req.query.hasOwnProperty('limit') ? parseInt(req.query.limit, 10) : 10;
    const page = req.query.hasOwnProperty('page') ? parseInt(req.query.page, 10) : 1;
    return this.storesService.findAll({ page, limit }, params);
  }

  @Post('distance')
  distance(@Body() distanceDto: DistanceDto) {
    return this.storesService.distance(distanceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() storeDto: UpdateStoreDto) {
    return this.storesService.update(+id, storeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
