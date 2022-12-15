import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UtilityService } from './utility.service';

@Controller('utility')
export class UtilityController {
  constructor(private readonly utilityService: UtilityService) {}
}
