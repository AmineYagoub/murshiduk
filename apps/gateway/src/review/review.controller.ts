import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { isPublic } from '../decorators/isPublic.decorator';

import { CreateReviewDto } from '../dto/review/create';

import { WhereReviewArgs } from '../dto/review/pagination';

import { UpdateReviewDto } from '../dto/review/update';

import { ReviewsService } from './review.service';

@Controller('review')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Get(':id')
  async getReviewById(@Param('id') id: string) {
    return this.reviewService.getReview({ id });
  }

  @isPublic()
  @Post()
  async createReview(@Body() body: CreateReviewDto) {
    return this.reviewService.createReview(body);
  }

  @Put(':id')
  async updateReview(@Param('id') id: string, @Body() body: UpdateReviewDto) {
    return this.reviewService.updateReview({
      where: { id },

      data: body,
    });
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview({ id });
  }

  @isPublic()
  @Get('filter')
  async getFilteredReviews(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('published', new DefaultValuePipe(undefined)) published: string
  ) {
    return this.reviewService.getReviews({
      skip,
      take,
      where: this.buildWhere({ published }),
      orderBy: { created: Prisma.SortOrder.desc },
    });
  }

  private buildWhere(where?: WhereReviewArgs): Prisma.ReviewsWhereInput {
    const filter: Prisma.ReviewsWhereInput = {};
    if (where && Object.entries(where).length) {
      for (const [key, value] of Object.entries(where)) {
        if (value) {
          switch (key) {
            case 'published':
              filter.published = {
                equals: value === 'true',
              };
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
}
