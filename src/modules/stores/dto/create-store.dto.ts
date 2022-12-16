import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state_id: number;

  @IsNotEmpty()
  country_id: number;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'latitude:longitute',
  })
  location: string;
}
