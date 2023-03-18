import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/index';
import { useEffect, useState } from 'react';
import type {
  ColumnType,
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import { TableProps } from 'antd/es/table';
import { useRouter } from 'next/router';
import {
  Service,
  ServiceDataIndex,
  ServiceFields,
  ServicePaginationDto,
  ServiceResponse,
  OrderServiceByParams,
  OrderByType,
  Pagination,
  WhereServiceParams,
  ServiceType,
} from '@/utils/types';

const fetchServices = async (
  params: ServicePaginationDto
): Promise<ServiceResponse> => {
  const { take, skip, orderBy, where } = params;
  const path = where.type === 'SERVICE' ? 'filter-service' : 'filter-travel';
  const query = new URLSearchParams({ take: String(take), skip: String(skip) });
  for (const [key, val] of Object.entries({ ...where, ...orderBy })) {
    if (val) {
      query.append(key, val);
    }
  }
  return await api.get(`our-services/${path}?${query.toString()}`).json();
};

const fetchService = async (slug: string): Promise<Service> => {
  return await api.get(`our-services/slug/${slug}`).json();
};

const useServices = (type: ServiceType = 'SERVICE') => {
  const router = useRouter();
  const { query } = router;
  const [pagination, setPagination] = useState<Pagination>({
    offset: (Number(query?.page) - 1) * Number(query?.pageSize) || 0,
    limit: Number(query?.pageSize) || 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const search = decodeURIComponent(String(query?.search || ''));
  const [defaultSearchValue] = useState(search);
  const [where, setWhere] = useState<WhereServiceParams>({ search, type });
  const [orderBy, setOrderBy] = useState<OrderServiceByParams>({});
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<ColumnType<Service>> | SorterResult<ColumnType<Service>[]>
  >({});

  const handleFilter = (value: string | number | boolean, record: Service) => {
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
    setWhere({ type });
    setOrderBy({});
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    router.push(
      {
        query: { ...router.query, page, pageSize },
      },
      undefined,
      { shallow: true }
    );
    setPagination((prev) => ({
      ...prev,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }));
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: ServiceDataIndex
  ) => {
    confirm();
  };

  const handleTableChange: TableProps<ColumnType<Service>>['onChange'] = (
    _,
    filters,
    sorter: SorterResult<Service>
  ) => {
    const { field, order } = sorter;
    const o: OrderServiceByParams = {};

    if (order) {
      for (const key in ServiceFields) {
        if (key === field) {
          o[key] = order === 'ascend' ? OrderByType.Asc : OrderByType.Desc;
          break;
        }
      }
    }

    const w: WhereServiceParams = { type };

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

  const onSearch = (value: string) => {
    router.push(
      {
        query: { search: encodeURIComponent(value) },
      },
      undefined,
      { shallow: true }
    );
    setWhere((prev) => ({
      ...prev,
      search: value,
    }));
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      type,
      {
        take: pagination.limit,
        skip: pagination.offset,
        where,
        orderBy,
      },
    ],
    keepPreviousData: true,
    queryFn: () =>
      fetchServices({
        take: pagination.limit,
        skip: pagination.offset,
        where,
        orderBy,
      }),
  });

  useEffect(() => {
    if (data) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [data]);

  const methods = {
    handleReset,
    refetch,
    handleFilter,
    handleSearch,
    handleTableChange,
    clearAllFilters,
    onSearch,
    handlePagination: {
      total: data?.total ?? 0,
      pageSize: pagination.limit,
      current: Number(query?.page || 1),
      pageSizeOptions: ['10', '20', '30', '50'],
      showSizeChanger: false,
      onShowSizeChange: onPaginationChange,
      onChange: onPaginationChange,
      responsive: true,
      hideOnSinglePage: true,
    },
  };

  return {
    methods,
    isLoading,
    sortedInfo,
    filteredInfo,
    defaultSearchValue,
    data: data?.data.map((d) => ({ key: d.id, ...d })) ?? [],
  };
};

const useService = () => {
  const router = useRouter();
  const ServiceSlug = String(router.query?.slug);
  const { data, isError } = useQuery({
    queryKey: ['getService', ServiceSlug],
    queryFn: () => fetchService(ServiceSlug),
    enabled: ServiceSlug.length > 0,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (isError) {
      router.push('/404');
    }
  }, [isError, router]);
  return { data };
};

export { useServices, useService, fetchService, fetchServices };
