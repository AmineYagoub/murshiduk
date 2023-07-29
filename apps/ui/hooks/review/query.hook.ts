import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/index';
import { useState } from 'react';
import type { FilterConfirmProps, FilterValue } from 'antd/es/table/interface';
import {
  Review,
  ReviewDataIndex,
  ReviewPaginationDto,
  ReviewResponse,
  OrderReviewByParams,
  Pagination,
  WhereReviewParams,
} from '@/utils/types';

const fetchReviews = async (
  params: ReviewPaginationDto
): Promise<ReviewResponse> => {
  const { take, skip, orderBy, where } = params;
  const query = new URLSearchParams({ take: String(take), skip: String(skip) });
  for (const [key, val] of Object.entries({ ...where, ...orderBy })) {
    if (val) {
      query.append(key, String(val));
    }
  }
  return await api.get(`review/filter?${query.toString()}`).json();
};

const fetchReview = async (id: string): Promise<Review> => {
  return await api.get(`review/${id}`).json();
};

const useReview = (id: string) => {
  return useQuery({
    queryKey: ['getReview', id],
    queryFn: () => fetchReview(id),
    enabled: false,
  });
};

const useReviews = (limit: number, initWhere?: WhereReviewParams) => {
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [where, setWhere] = useState<WhereReviewParams>(initWhere);
  const [orderBy, setOrderBy] = useState<OrderReviewByParams>({});
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleFilter = (value: string | number | boolean, record: Review) => {
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
      limit,
    });
    setWhere(initWhere);
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
    dataIndex: ReviewDataIndex
  ) => {
    confirm();
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      'getReviews',
      {
        take: pagination.limit,
        skip: pagination.offset,
        where,
        orderBy,
      },
    ],
    keepPreviousData: true,
    queryFn: () =>
      fetchReviews({
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
    clearAllFilters,
    handlePagination: {
      total: data?.total ?? 0,
      pageSize: pagination.limit,
      pageSizeOptions: ['10', '20', '30', '50'],
      showSizeChanger: true,
      onShowSizeChange: onPaginationChange,
      onChange: onPaginationChange,
      hideOnSinglePage: true,
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

export { useReviews, fetchReviews, useReview };
