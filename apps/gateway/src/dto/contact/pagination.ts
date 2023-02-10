import { ContactStatus } from '@prisma/client';
import { OrderByType, PaginatedArgs } from '../common/pagination';

export class OrderContactArgs {
  created?: OrderByType;

  updated?: OrderByType;
}

export class WhereContactArgs {
  search?: string;

  status?: ContactStatus;
}

export class ContactPaginationDto extends PaginatedArgs<
  WhereContactArgs,
  OrderContactArgs
>() {}
