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
import { Blog, Prisma } from '@prisma/client';
import { BlogService } from './blog.service';
import { CreateBlogDto } from '../dto/blog/create';
import { UpdateBlogDto } from '../dto/blog/update';
import { OrderByType } from '../dto/common/pagination';
import { isPublic } from '../decorators/isPublic.decorator';
import { OrderBlogArgs, WhereBlogArgs } from '../dto/blog/pagination';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @isPublic()
  @Get(':id')
  async getBlogById(@Param('id') id: string): Promise<Blog> {
    return this.blogService.blog({ id });
  }

  @isPublic()
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

  @isPublic()
  @Get('filter')
  async getFilteredBlogs(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('search', new DefaultValuePipe(undefined)) search: string,
    @Query('tag', new DefaultValuePipe(undefined)) tag: string,
    @Query('created', new DefaultValuePipe(Prisma.SortOrder.desc))
    created: OrderByType
  ): Promise<{
    total: number;
    data: Blog[];
  }> {
    return this.blogService.blogs({
      skip,
      take,
      where: this.buildWhere({ search, tag }),
      orderBy: this.buildSorter({ created }),
    });
  }

  private buildWhere(where?: WhereBlogArgs): Prisma.BlogWhereInput {
    const filter: Prisma.BlogWhereInput = { published: true };
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
            case 'tag':
              filter.categories = {
                some: {
                  slug: value,
                },
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
