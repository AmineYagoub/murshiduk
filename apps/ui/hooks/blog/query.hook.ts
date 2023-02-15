import { useQuery } from '@tanstack/react-query';
import { api, AppRoutes } from '@/utils/index';
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
  Blog,
  BlogDataIndex,
  BlogFields,
  BlogPaginationDto,
  BlogResponse,
  OrderBlogByParams,
  OrderByType,
  Pagination,
  WhereBlogParams,
} from '@/utils/types';

const fetchBlogs = async (params: BlogPaginationDto): Promise<BlogResponse> => {
  const { take, skip, orderBy, where } = params;
  const query = new URLSearchParams({ take: String(take), skip: String(skip) });
  for (const [key, val] of Object.entries({ ...where, ...orderBy })) {
    if (val) {
      query.append(key, val);
    }
  }
  return await api.get(`blog/filter?${query.toString()}`).json();
};

const fetchBlog = async (slug: string): Promise<Blog> => {
  return await api.get(`blog/slug/${slug}`).json();
};

const useBlogs = () => {
  const router = useRouter();
  const { query } = router;
  const [pagination, setPagination] = useState<Pagination>({
    offset: (Number(query?.page) - 1) * Number(query?.pageSize) || 0,
    limit: Number(query?.pageSize) || 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const tag = String(query?.tag || '');
  const search = decodeURIComponent(String(query?.search || ''));
  const [defaultSearchValue] = useState(search);
  const [where, setWhere] = useState<WhereBlogParams>({ search, tag });
  const [orderBy, setOrderBy] = useState<OrderBlogByParams>({});
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<ColumnType<Blog>> | SorterResult<ColumnType<Blog>[]>
  >({});

  const handleFilter = (value: string | number | boolean, record: Blog) => {
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
    dataIndex: BlogDataIndex
  ) => {
    confirm();
  };

  const handleTableChange: TableProps<ColumnType<Blog>>['onChange'] = (
    _,
    filters,
    sorter: SorterResult<Blog>
  ) => {
    const { field, order } = sorter;
    const o: OrderBlogByParams = {};

    if (order) {
      for (const key in BlogFields) {
        if (key === field) {
          o[key] = order === 'ascend' ? OrderByType.Asc : OrderByType.Desc;
          break;
        }
      }
    }

    const w: WhereBlogParams = {};

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
        query: { tag, search: encodeURIComponent(value) },
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
      'blogs',
      {
        take: pagination.limit,
        skip: pagination.offset,
        where,
        orderBy,
      },
    ],
    keepPreviousData: true,
    queryFn: () =>
      fetchBlogs({
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
    },
  };

  return {
    tag,
    methods,
    isLoading,
    sortedInfo,
    filteredInfo,
    defaultSearchValue,
    data: data?.data.map((d) => ({ key: d.id, ...d })) ?? [],
  };
};

const useBlog = () => {
  const router = useRouter();
  const blogSlug = String(router.query?.slug);
  const { data, isError } = useQuery({
    queryKey: ['getBlog', blogSlug],
    queryFn: () => fetchBlog(blogSlug),
    enabled: blogSlug.length > 0,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (isError) {
      router.push('/404');
    }
  }, [isError, router]);
  return { data };
};

export { useBlogs, useBlog, fetchBlog, fetchBlogs };
