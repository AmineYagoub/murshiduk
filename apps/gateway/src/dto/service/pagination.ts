import { OrderByType, PaginatedArgs } from '../common/pagination';

export class OrderServiceArgs {
  created?: OrderByType;

  updated?: OrderByType;
}

export class WhereServiceArgs {
  search?: string;

  published?: boolean;

  tag?: string;
}

export class ServicePaginationDto extends PaginatedArgs<
  WhereServiceArgs,
  OrderServiceArgs
>() {}
