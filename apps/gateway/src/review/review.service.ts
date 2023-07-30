import { Injectable } from '@nestjs/common';

import { Reviews, Prisma } from '@prisma/client';

import { PrismaService } from '../app/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getReview(
    reviewWhereUniqueInput: Prisma.ReviewsWhereUniqueInput
  ): Promise<Reviews | null> {
    return this.prisma.reviews.findUnique({
      where: reviewWhereUniqueInput,
    });
  }

  async getReviews(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReviewsWhereUniqueInput;
    where?: Prisma.ReviewsWhereInput;
    orderBy?: Prisma.ReviewsOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where } = params;

    const data = await this.prisma.$transaction([
      this.prisma.reviews.count({ where }),
      this.prisma.reviews.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy: { created: Prisma.SortOrder.desc },
      }),
    ]);

    return {
      total: data[0],
      data: data[1],
    };
  }

  async createReview(data: Prisma.ReviewsCreateInput) {
    return this.prisma.reviews.create({
      data,
    });
  }

  async createReviewNote(data: Prisma.ReviewsCreateInput) {
    return this.prisma.reviews.create({
      data,
    });
  }

  async deleteReviewNote(where: Prisma.ReviewsWhereUniqueInput) {
    return this.prisma.reviews.delete({
      where,
    });
  }

  async updateReview(params: {
    where: Prisma.ReviewsWhereUniqueInput;
    data: Prisma.ReviewsUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.reviews.update({
      data,
      where,
    });
  }

  async deleteReview(where: Prisma.ReviewsWhereUniqueInput) {
    return this.prisma.reviews.delete({
      where,
    });
  }
}
