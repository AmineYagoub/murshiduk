import { OrderByType, PaginatedArgs } from '../common/pagination';

export class OrderCategoryArgs {
  created?: OrderByType;

  updated?: OrderByType;
}

export class WhereCategoryArgs {
  search?: string;
}

export class CategoryPaginationDto extends PaginatedArgs<
  WhereCategoryArgs,
  OrderCategoryArgs
>() {}
