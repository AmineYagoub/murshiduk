import { useQuery } from '@tanstack/react-query';
import { api, Pagination } from '@/utils/index';
import { useState } from 'react';
import type {
  ColumnType,
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import { TableProps } from 'antd/es/table';

export type Category = {
  id: string;
  title: string;
  parent?: Category;
};

export type CategoryDataIndex = keyof Category;

export const CategoryFields: { [P in CategoryDataIndex]: P } = {
  id: 'id',
  title: 'title',
  parent: 'parent',
};

export enum OrderByType {
  Asc = 'asc',
  Desc = 'desc',
}

type WhereParams = {
  search?: string;
};
type OrderByParams = {
  created?: OrderByType;
  updated?: OrderByType;
};

interface CategoryPaginationDto {
  skip: number;
  take: number;
  where?: WhereParams;
  orderBy?: OrderByParams;
}

interface CategoryResponse {
  total: number;
  data: Category[];
}

const fetchCategories = async (
  params: CategoryPaginationDto
): Promise<CategoryResponse> => {
  let source = 'category/filter';
  const q = new URLSearchParams(params.where);
  if (q.toString()) {
    source += `?${q.toString()}`;
  }
  return await api.get(source).json();
};

const useCategories = () => {
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [where, setWhere] = useState<WhereParams>({});
  const [orderBy, setOrderBy] = useState<OrderByParams>({});
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<ColumnType<Category>> | SorterResult<ColumnType<Category>[]>
  >({});

  const handleFilter = (value: string | number | boolean, record: Category) => {
    return true;
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };
  const clearAllFilters = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setPagination({
      offset: 0,
      limit: 10,
    });
    setWhere({});
    setOrderBy({});
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }));
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: CategoryDataIndex
  ) => {
    confirm();
  };

  const handleTableChange: TableProps<ColumnType<Category>>['onChange'] = (
    _,
    filters,
    sorter: SorterResult<Category>
  ) => {
    const { field, order } = sorter;
    const o: OrderByParams = {};

    if (order) {
      for (const key in CategoryFields) {
        if (key === field) {
          o[key] = order === 'ascend' ? OrderByType.Asc : OrderByType.Desc;
          break;
        }
      }
    }

    const w: WhereParams = {};

    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        w[key] = value[0];
      }
    }

    setOrderBy(o);
    setWhere(w);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      'category',
      {
        take: pagination.limit,
        skip: pagination.offset,
        where,
        orderBy,
      },
    ],
    keepPreviousData: true,
    queryFn: () =>
      fetchCategories({
        take: pagination.limit,
        skip: pagination.offset,
        where,
        orderBy,
      }),
  });
  const methods = {
    handleReset,
    refetch,
    handleFilter,
    handleSearch,
    handleTableChange,
    clearAllFilters,
    handlePagination: {
      total: data?.total ?? 0,
      pageSize: pagination.limit,
      pageSizeOptions: ['10', '20', '30', '50'],
      showSizeChanger: true,
      onShowSizeChange: onPaginationChange,
      onChange: onPaginationChange,
    },
  };

  return {
    methods,
    data: data?.data.map((d) => ({ key: d.id, ...d })) ?? [],
    isLoading,
    filteredInfo,
    sortedInfo,
  };
};

export { useCategories, fetchCategories };
