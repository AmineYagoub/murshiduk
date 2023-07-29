import { Module } from '@nestjs/common';

import { PrismaService } from '../app/prisma.service';

import { ReviewsController } from './review.controller';

import { ReviewsService } from './review.service';

@Module({
  imports: [],

  controllers: [ReviewsController],

  providers: [ReviewsService, PrismaService],
})
export class ReviewsModule {}
