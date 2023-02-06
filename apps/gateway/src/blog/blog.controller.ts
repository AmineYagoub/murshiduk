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
import {
  OrderBlogArgs,
  WhereBlogArgs,
  BlogPaginationDto,
} from '../dto/blog/pagination';
import slugify from '../utils/slugify';
import { Blog, Prisma } from '@prisma/client';
import { BlogService } from './blog.service';
import { CreateBlogDto } from '../dto/blog/create';
import { UpdateBlogDto } from '../dto/blog/update';
import { OrderByType } from '../dto/common/pagination';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get(':id')
  async getBlogById(@Param('id') id: string): Promise<Blog> {
    return this.blogService.blog({ id });
  }

  @Get('slug/:slug')
  async getBlogBySlug(@Param('slug') slug: string) {
    const blog = await this.blogService.blog({ slug });
    const recommended = await this.blogService.relatedBlogs(slug);
    return { ...blog, recommended };
  }

  @Post()
  async createBlog(@Body() body: CreateBlogDto): Promise<Blog> {
    const { authorId, categories, ...rest } = body;
    return this.blogService.createBlog({
      author: {
        connect: {
          id: authorId,
        },
      },
      categories: {
        connect: categories.map((id) => ({ id })),
      },
      slug: slugify(body.title),
      ...rest,
    });
  }

  @Put('publish/:id')
  async publishBlog(
    @Param('id') id: string,
    @Param('published') published: boolean
  ): Promise<Blog> {
    return this.blogService.updateBlog({
      where: { id },
      data: { published },
    });
  }

  @Put(':id')
  async updateBlog(
    @Param('id') id: string,
    @Body() body: UpdateBlogDto
  ): Promise<Blog> {
    const { categories, ...rest } = body;
    return this.blogService.updateBlog({
      where: { id },
      data: {
        categories: {
          set: categories.map((id) => ({ id })),
        },
        slug: slugify(body.title),
        ...rest,
      },
    });
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string): Promise<Blog> {
    return this.blogService.deleteBlog({ id });
  }

  @Get('filter')
  async getFilteredBlogs(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('search', new DefaultValuePipe(undefined)) search: string,
    @Query('created', new DefaultValuePipe(Prisma.SortOrder.desc))
    created: OrderByType
  ): Promise<{
    total: number;
    data: Blog[];
  }> {
    return this.blogService.blogs({
      skip,
      take,
      where: this.buildWhere({ search }),
      orderBy: this.buildSorter({ created }),
    });
  }

  private buildWhere(where?: WhereBlogArgs): Prisma.BlogWhereInput {
    const filter: Prisma.BlogWhereInput = {};
    if (where && Object.entries(where).length) {
      for (const [key, value] of Object.entries(where)) {
        switch (key) {
          case 'search':
            if (value) {
              filter.OR = [
                {
                  title: { contains: value },
                },
                {
                  content: { contains: value },
                },
              ];
            }
            break;
          case 'category':
            filter.categories = {
              some: value,
            };
            break;
          case 'published':
            filter.published = {
              equals: value,
            };
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
