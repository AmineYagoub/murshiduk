import { useQuery } from '@tanstack/react-query';
import { api, Pagination } from '@/utils/index';
import { useEffect, useState } from 'react';
import type {
  ColumnType,
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import { TableProps } from 'antd/es/table';
import { useRouter } from 'next/router';

type Profile = {
  avatar: string;
  firstName: string;
  lastName: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  descriptionMeta: string;
  content: string;
  published: boolean;
  created: string;
  updated: string;
  author: {
    profile: Profile;
    role: {
      title: string;
    };
  };
  categories: { id: string; title: string; slug: string }[];
  recommended: {
    title: string;
    slug: string;
    created: Date;
    author: {
      profile: Profile;
    };
  }[];
};

export type BlogDataIndex = keyof Blog;

export const BlogFields: { [P in BlogDataIndex]: P } = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  published: 'published',
  author: 'author',
  categories: 'categories',
  content: 'content',
  descriptionMeta: 'descriptionMeta',
  created: 'created',
  updated: 'updated',
  recommended: 'recommended',
};

export enum OrderByType {
  Asc = 'asc',
  Desc = 'desc',
}

type WhereParams = {
  search?: string;
  published?: string;
};
type OrderByParams = {
  created?: OrderByType;
  updated?: OrderByType;
};

interface BlogPaginationDto {
  skip: number;
  take: number;
  where?: WhereParams;
  orderBy?: OrderByParams;
}

interface BlogResponse {
  total: number;
  data: Blog[];
}

const fetchBlogs = async (params: BlogPaginationDto): Promise<BlogResponse> => {
  let source = 'blog/filter';
  const q = new URLSearchParams(params.where);
  if (q.toString()) {
    source += `?${q.toString()}`;
  }
  return await api.get(source).json();
};

const fetchBlog = async (slug: string): Promise<Blog> => {
  return await api.get(`blog/slug/${slug}`).json();
};

const useBlogs = () => {
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
    const o: OrderByParams = {};

    if (order) {
      for (const key in BlogFields) {
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

export { useBlogs, useBlog, fetchBlog };
