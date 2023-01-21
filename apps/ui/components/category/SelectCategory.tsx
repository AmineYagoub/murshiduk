import debounce from 'lodash/debounce';
import { Form, Select, Spin } from 'antd';
import type { SelectProps } from 'antd/es/select';
import React, { useCallback, useMemo, useRef, useState } from 'react';

interface DebounceSelectProps<ValueType>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  isContest: boolean;
}

const { Option } = Select;

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  }
>({
  fetchOptions,
  isContest,
  debounceTimeout = 800,
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
    <Form.Item name="categories" label="الأقسام">
      <Select
        allowClear
        showArrow
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        onFocus={() => debounceFetcher('')}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
      >
        {options.map((el) => (
          <Option key={el.value} value={el.value} label={el.label}>
            <div>{el.label}</div>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}

export interface TagValue {
  label: string;
  value: string;
}

const SelectCategory = ({
  isContest,
  isTeacher,
}: {
  isContest: boolean;
  isTeacher: boolean;
}) => {
  const [value, setValue] = useState<TagValue[]>([]);
  const [FindTopicsQuery] = [() => 10];
  const fetchTags = useCallback(
    async (search: string) => {
      /* if (isTeacher) {
        const { data } = await FindTopicsQuery({
          variables: {
            title: search,
            level: selectedLevel,
          },
        });
        return data.findTopics.map((topic) => ({
          label: topic.title,
          value: topic.id,
          level: topic.level,
        }));
      } */

      return [];
    },
    [FindTopicsQuery, isTeacher]
  );

  return (
    <DebounceSelect
      mode="multiple"
      maxTagCount={3}
      value={value}
      placeholder="البحث عن الأقسام"
      fetchOptions={fetchTags}
      onChange={(newValue) => {
        setValue(newValue as TagValue[]);
      }}
      style={{ width: '100%' }}
      isContest={isContest}
    />
  );
};

export default SelectCategory;
