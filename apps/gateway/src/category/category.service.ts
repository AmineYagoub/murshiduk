import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../app/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async category(
    categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput
  ): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: categoryWhereUniqueInput,
    });
  }

  async categories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<{
    total: number;
    data: Category[];
  }> {
    const { skip, take, cursor, where, orderBy } = params;
    const data = await this.prisma.$transaction([
      this.prisma.category.count({ where }),
      this.prisma.category.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: { parent: true },
      }),
    ]);
    return {
      total: data[0],
      data: data[1],
    };
  }

  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  async updateCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }): Promise<Category> {
    const { where, data } = params;
    return this.prisma.category.update({
      data,
      where,
    });
  }

  async deleteCategory(
    where: Prisma.CategoryWhereUniqueInput
  ): Promise<Category> {
    return this.prisma.category.delete({
      where,
    });
  }
}
