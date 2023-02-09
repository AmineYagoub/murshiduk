import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Query,
  Put,
} from '@nestjs/common';
import { UpdateAppConfigDto } from '../dto/common/app.dto';

import { AppService } from './app.service';

@Controller('config')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAppConfig(
    @Query('field', new DefaultValuePipe(undefined)) field?: string
  ) {
    return this.appService.find(field);
  }

  @Put()
  async updateAppConfig(@Body() data: UpdateAppConfigDto) {
    return this.appService.update(data);
  }
}
