import { OrderByType, PaginatedArgs } from '../common/pagination';

export class OrderReviewArgs {
  created?: OrderByType;

  updated?: OrderByType;
}

export class WhereReviewArgs {
  search?: string;

  published?: string;
}

export class ReviewPaginationDto extends PaginatedArgs<
  WhereReviewArgs,
  OrderReviewArgs
>() {}
