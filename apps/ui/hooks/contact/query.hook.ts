import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/index';
import { useState } from 'react';
import type { FilterConfirmProps, FilterValue } from 'antd/es/table/interface';
import {
  Contact,
  ContactDataIndex,
  ContactPaginationDto,
  ContactResponse,
  OrderContactByParams,
  Pagination,
  WhereContactParams,
} from '@/utils/types';

const fetchContacts = async (
  params: ContactPaginationDto
): Promise<ContactResponse> => {
  const { take, skip, orderBy, where } = params;
  const query = new URLSearchParams({ take: String(take), skip: String(skip) });
  for (const [key, val] of Object.entries({ ...where, ...orderBy })) {
    if (val) {
      query.append(key, val);
    }
  }
  return await api.get(`contact/filter?${query.toString()}`).json();
};

const fetchContact = async (id: string): Promise<Contact> => {
  return await api.get(`contact/${id}`).json();
};

const useContact = (id: string) => {
  return useQuery({
    queryKey: ['getContact', id],
    queryFn: () => fetchContact(id),
    enabled: false,
  });
};

const useContacts = () => {
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [where, setWhere] = useState<WhereContactParams>({});
  const [orderBy, setOrderBy] = useState<OrderContactByParams>({});
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleFilter = (value: string | number | boolean, record: Contact) => {
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
    dataIndex: ContactDataIndex
  ) => {
    confirm();
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      'contacts',
      {
        take: pagination.limit,
        skip: pagination.offset,
        where,
        orderBy,
      },
    ],
    keepPreviousData: true,
    queryFn: () =>
      fetchContacts({
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

export { useContacts, fetchContacts, useContact };
