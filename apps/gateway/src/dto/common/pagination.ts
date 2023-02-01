export function PaginatedArgs<IWhere, IOrder>() {
  abstract class PaginateType {
    skip?: number;

    take?: number;

    where?: IWhere;

    orderBy?: IOrder;
  }
  return PaginateType;
}

export enum OrderByType {
  Asc = 'asc',
  Desc = 'desc',
}
