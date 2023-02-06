import debounce from 'lodash/debounce';
import { Form, Select, Spin } from 'antd';
import type { SelectProps } from 'antd/es/select';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { fetchCategories } from '@/hooks/category/query.hook';
import { useQuery } from '@tanstack/react-query';

interface DebounceSelectProps<ValueType>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  isDashboard: boolean;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  }
>({
  fetchOptions,
  isDashboard,
  debounceTimeout = 100,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Form.Item
      name="categories"
      label={isDashboard ? 'القسم الأب' : 'الأقسام'}
      required={!isDashboard}
      rules={[
        {
          required: !isDashboard,
          message: 'يرجى تحديد قسم واحد على الأقل',
        },
      ]}
    >
      <Select
        allowClear
        showArrow
        showSearch
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        onFocus={() => debounceFetcher('')}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        options={options}
        {...props}
      />
    </Form.Item>
  );
}

export interface TagValue {
  label: string;
  value: string;
}

const SelectCategory = ({ isDashboard }: { isDashboard?: boolean }) => {
  const [value, setValue] = useState<TagValue[]>([]);
  const [search, setSearch] = useState<string>('');
  const { isFetching, refetch } = useQuery({
    queryKey: ['category-search', search],
    enabled: false,
    queryFn: () =>
      fetchCategories({
        take: 100,
        skip: 0,
        where: { search },
      }),
  });

  const fetchTags = useCallback(
    async (val: string) => {
      setSearch(val);
      const { data } = await refetch();
      return data
        ? data.data.map((topic) => ({
            label: topic.title,
            value: topic.id,
          }))
        : [];
    },
    [refetch]
  );

  return (
    <DebounceSelect
      mode={isDashboard ? null : 'multiple'}
      maxTagCount={3}
      value={value}
      placeholder="حدد الأقسام"
      fetchOptions={fetchTags}
      onChange={(newValue) => {
        setValue(newValue as TagValue[]);
      }}
      style={{ width: '100%' }}
      isDashboard={isDashboard}
      loading={isFetching}
    />
  );
};

export default SelectCategory;
