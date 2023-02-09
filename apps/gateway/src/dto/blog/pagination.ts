import { OrderByType, PaginatedArgs } from '../common/pagination';

export class OrderBlogArgs {
  created?: OrderByType;

  updated?: OrderByType;
}

export class WhereBlogArgs {
  search?: string;

  published?: boolean;

  tag?: string;
}

export class BlogPaginationDto extends PaginatedArgs<
  WhereBlogArgs,
  OrderBlogArgs
>() {}
