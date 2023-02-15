import {
  Get,
  Put,
  Body,
  Query,
  Controller,
  DefaultValuePipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { isPublic } from '../decorators/isPublic.decorator';
import { UpdateAppConfigDto } from '../dto/common/app.dto';
@Controller('config')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @isPublic()
  @Get()
  async findAppConfig(
    @Query('field', new DefaultValuePipe(undefined)) field?: string
  ) {
    return this.appService.find(field);
  }

  @Get('dashboard')
  async dashboard() {
    return this.appService.dashboard();
  }

  @Put()
  async updateAppConfig(@Body() data: UpdateAppConfigDto) {
    return this.appService.update(data);
  }
}
