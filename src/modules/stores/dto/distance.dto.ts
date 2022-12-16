import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DistanceDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'latitude:longitute',
  })
  location: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'latitude:longitute',
  })
  destination: string;
}
