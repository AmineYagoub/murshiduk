import {
  Put,
  Get,
  Body,
  Post,
  Param,
  Query,
  Delete,
  Controller,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import slugify from '../utils/slugify';
import { Prisma, Service } from '@prisma/client';
import { OrderByType } from '../dto/common/pagination';
import { CreateServiceDto } from '../dto/service/create';
import { UpdateServiceDto } from '../dto/service/update';
import { OurServicesService } from './ourService.service';
import { isPublic } from '../decorators/isPublic.decorator';
import { OrderServiceArgs, WhereServiceArgs } from '../dto/service/pagination';

@Controller('our-services')
export class OurServiceController {
  constructor(private readonly ourService: OurServicesService) {}

  @isPublic()
  @Get(':id')
  async getServiceById(@Param('id') id: string) {
    return this.ourService.service({ id });
  }

  @isPublic()
  @Get('slug/:slug')
  async getServiceBySlug(@Param('slug') slug: string) {
    return this.ourService.service({ slug });
  }

  @Post()
  async createService(@Body() body: CreateServiceDto) {
    const { authorId, ...rest } = body;
    return this.ourService.createService({
      author: {
        connect: {
          id: authorId,
        },
      },
      slug: slugify(body.title),
      ...rest,
    });
  }

  @Put(':id')
  async updateService(@Param('id') id: string, @Body() body: UpdateServiceDto) {
    return this.ourService.updateService({
      where: { id },
      data: {
        slug: slugify(body.title),
        ...body,
      },
    });
  }

  @Delete(':id')
  async deleteService(@Param('id') id: string) {
    return this.ourService.deleteService({ id });
  }

  @isPublic()
  @Get('filter-travel')
  async getFilteredTravels(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('search', new DefaultValuePipe(undefined)) search: string,
    @Query('created', new DefaultValuePipe(Prisma.SortOrder.desc))
    created: OrderByType
  ): Promise<{
    total: number;
    data: Service[];
  }> {
    return this.ourService.services({
      skip,
      take,
      where: { ...this.buildWhere({ search }), type: 'TRAVEL' },
      orderBy: this.buildSorter({ created }),
    });
  }

  @isPublic()
  @Get('filter-service')
  async getFilteredServices(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('search', new DefaultValuePipe(undefined)) search: string,
    @Query('created', new DefaultValuePipe(Prisma.SortOrder.desc))
    created: OrderByType
  ): Promise<{
    total: number;
    data: Service[];
  }> {
    return this.ourService.services({
      skip,
      take,
      where: { ...this.buildWhere({ search }), type: 'SERVICE' },
      orderBy: this.buildSorter({ created }),
    });
  }

  private buildWhere(where?: WhereServiceArgs): Prisma.ServiceWhereInput {
    const filter: Prisma.ServiceWhereInput = {};
    if (where && Object.entries(where).length) {
      for (const [key, value] of Object.entries(where)) {
        if (value) {
          switch (key) {
            case 'search':
              filter.OR = [
                {
                  title: { contains: value },
                },
                {
                  content: { contains: value },
                },
              ];

              break;

            case 'authorId':
              filter.authorId = String(value);
              break;
            case 'created':
              filter.created = {
                lte: new Date(value[1]),
                gte: new Date(value[0]),
              };
              break;
            default:
              break;
          }
        }
      }
    }
    return filter;
  }

  private buildSorter(orderBy: OrderServiceArgs) {
    const entries = Object.entries(orderBy ?? {});
    return entries.length
      ? (entries.map(([key, value]) => ({
          [key]: value,
        })) as Prisma.ServiceOrderByWithRelationInput)
      : { created: Prisma.SortOrder.desc };
  }
}
