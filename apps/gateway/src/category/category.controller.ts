import {
  Put,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import slugify from '../utils/slugify';
import { Prisma } from '@prisma/client';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from '../dto/category/create';
import { UpdateCategoryDto } from '../dto/category/update';
import { CategoryPaginationDto } from '../dto/category/pagination';
import { OrderBlogArgs, WhereBlogArgs } from '../dto/blog/pagination';
import { OrderByType } from '../dto/common/pagination';
import { isPublic } from '../decorators/isPublic.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @isPublic()
  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return this.categoryService.category({ id });
  }

  @isPublic()
  @Get('slug/:slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoryService.category({ slug });
  }

  @Post()
  async createCategory(@Body() body: CreateCategoryDto) {
    const { parentId, title } = body;
    const input: Prisma.CategoryCreateInput = {
      title,
      slug: slugify(title),
    };
    if (parentId) {
      input.parent = {
        connect: {
          id: parentId,
        },
      };
    }
    return this.categoryService.createCategory(input);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto
  ) {
    const { parentId, title } = body;
    const input: Prisma.CategoryCreateInput = {
      title,
      slug: slugify(title),
    };
    if (parentId) {
      input.parent = {
        connect: {
          id: parentId,
        },
      };
    }
    return this.categoryService.updateCategory({
      where: { id },
      data: input,
    });
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory({ id });
  }

  @Get('filter')
  async getFilteredCategories(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('search', new DefaultValuePipe(undefined)) search: string
  ) {
    return this.categoryService.categories({
      skip,
      take,
      where: this.buildWhere({ search }),
      orderBy: { title: Prisma.SortOrder.asc },
    });
  }

  private buildWhere(where?: WhereBlogArgs): Prisma.BlogWhereInput {
    const filter: Prisma.BlogWhereInput = {};
    if (where && Object.entries(where).length) {
      for (const [key, value] of Object.entries(where)) {
        switch (key) {
          case 'search':
            filter.title = { contains: value };
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
    return filter;
  }

  private buildSorter(orderBy: OrderBlogArgs) {
    const entries = Object.entries(orderBy ?? {});
    return entries.length
      ? (entries.map(([key, value]) => ({
          [key]: value,
        })) as Prisma.BlogOrderByWithRelationInput)
      : { created: Prisma.SortOrder.desc };
  }
}
