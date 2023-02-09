import { Injectable } from '@nestjs/common';
import { Blog, Prisma } from '@prisma/client';
import { PrismaService } from '../app/prisma.service';
import slugify from '../utils/slugify';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {
    this.seedBlogs().then(console.log);
  }

  async blog(
    blogWhereUniqueInput: Prisma.BlogWhereUniqueInput
  ): Promise<Blog | null> {
    return this.prisma.blog.findUnique({
      where: blogWhereUniqueInput,
      include: {
        author: {
          select: { profile: true, role: true },
        },
        categories: { select: { title: true, id: true, slug: true } },
      },
    });
  }

  async relatedBlogs(slug: string) {
    return this.prisma.blog.findMany({
      take: 5,
      where: {
        slug: {
          not: slug,
        },
      },
      select: {
        title: true,
        slug: true,
        created: true,
        author: {
          select: { profile: true },
        },
      },
    });
  }

  async blogs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BlogWhereUniqueInput;
    where?: Prisma.BlogWhereInput;
    orderBy?: Prisma.BlogOrderByWithRelationInput;
  }): Promise<{
    total: number;
    data: Blog[];
  }> {
    const { skip, take, cursor, where, orderBy } = params;
    const data = await this.prisma.$transaction([
      this.prisma.blog.count({ where }),
      this.prisma.blog.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          author: {
            select: { profile: true, role: true },
          },
          categories: { select: { title: true, id: true } },
        },
      }),
    ]);
    return {
      total: data[0],
      data: data[1],
    };
  }

  async createBlog(data: Prisma.BlogCreateInput): Promise<Blog> {
    return this.prisma.blog.create({
      data,
    });
  }

  async seedBlogs() {
    await this.prisma.blog.deleteMany();
    const categories = [
      '2526d463-685c-4586-84cc-6ac750dd5f31',
      '41bb4db6-9ca4-495d-970a-2bc678b3bfd8',
      '56591349-7e0c-493a-b2e9-7a631e7ff3b4',
      '8225702d-af85-489a-be4f-1275bfbc8e69',
      '83f0d561-b6ee-4a2d-a9fb-dfae2c149c6a',
      'fbdde059-f3ec-4d32-9113-9754b3b4a5e2',
    ];

    const data = Array.from({ length: 123 }).map((_, i) => {
      const shuffledArray = categories.sort(() => 0.5 - Math.random());
      const result = shuffledArray.slice(0, 2);
      return {
        title: `ant design part ${i}`,
        slug: slugify(`ant design part ${i}`),
        author: {
          connect: {
            id: '3d3bc583-d799-4289-88eb-757aecdfcb69',
          },
        },
        categories: {
          connect: result.map((id) => ({ id })),
        },
        descriptionMeta: `Ant Design, a design language for background applications, is refined by Ant UED Team. ${i}`,
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      };
    });
    for await (const iterator of data) {
      await this.createBlog(iterator);
    }
  }

  async updateBlog(params: {
    where: Prisma.BlogWhereUniqueInput;
    data: Prisma.BlogUpdateInput;
  }): Promise<Blog> {
    const { where, data } = params;
    return this.prisma.blog.update({
      data,
      where,
    });
  }

  async deleteBlog(where: Prisma.BlogWhereUniqueInput): Promise<Blog> {
    return this.prisma.blog.delete({
      where,
    });
  }
}
