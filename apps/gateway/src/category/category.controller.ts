import {
  Put,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import slugify from '../utils/slugify';
import { Prisma } from '@prisma/client';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from '../dto/category/create';
import { UpdateCategoryDto } from '../dto/category/update';
import { CategoryPaginationDto } from '../dto/category/pagination';
import { OrderBlogArgs, WhereBlogArgs } from '../dto/blog/pagination';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return this.categoryService.category({ id });
  }

  @Get('slug/:slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoryService.category({ slug });
  }

  @Post()
  async createCategory(@Body() body: CreateCategoryDto) {
    const { parentId, title } = body;
    return this.categoryService.createCategory({
      title,
      parent: {
        connect: {
          id: parentId,
        },
      },
      slug: slugify(title),
    });
  }

  @Put(':id')
  async updateCategory(@Body() body: UpdateCategoryDto) {
    const { categoryId, parentId, title } = body;
    return this.categoryService.updateCategory({
      where: { id: categoryId },
      data: {
        title,
        parent: {
          connect: {
            id: parentId,
          },
        },
        slug: slugify(title),
      },
    });
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory({ id });
  }

  @Get('filter')
  async getFilteredCategories(@Body() body: CategoryPaginationDto) {
    const { skip, take, where, orderBy } = body;
    return this.categoryService.categories({
      skip,
      take,
      where: this.buildWhere(where),
      orderBy: this.buildSorter(orderBy),
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
