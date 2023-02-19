import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Blog, Prisma } from '@prisma/client';
import { PrismaService } from '../app/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

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
    try {
      return await this.prisma.blog.create({
        data,
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new UnprocessableEntityException(e.message);
      }
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
