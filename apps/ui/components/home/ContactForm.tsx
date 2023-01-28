import Image from 'next/image';
import { Logger } from '@/utils/Logger';
import { FocusEvent, useState } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

export type PhoneType = {
  label: string;
  flag: string;
};

const onChange = (
  value: DatePickerProps['value'] | RangePickerProps['value'],
  dateString: [string, string] | string
) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  console.log('onOk: ', value);
};

const { Option } = Select;

const ContactForm = () => {
  const [phones, setPhones] = useState<PhoneType[]>([]);
  const [phonesStor, setPhonesStor] = useState<PhoneType[]>([]);

  const handleFetchPhones = (e: FocusEvent<HTMLElement, Element> | null) => {
    if (phones.length === 0) {
      fetch(process.env.NEXT_PUBLIC_COUNTRIES_ENDPOINT)
        .then((res) => res.json())
        .then(({ data }) => {
          const phones = data.map((country) => ({
            label: country.phone,
            flag: country.flag,
          }));

          setPhones(phones);
          setPhonesStor(phones);
        })
        .catch((e) => Logger.log(e));
    } else {
      setPhones(phonesStor);
    }
  };

  const handleChangePhones = (value: string) => {
    if (value?.length === 0) {
      setPhones(phonesStor);
    }
  };

  const handleSearch = (newValue: string) => {
    if (newValue) {
      setPhones(
        phonesStor?.filter((phone) =>
          phone.label.toLowerCase().match(newValue.toLowerCase())
        )
      );
    } else {
      setPhones(phonesStor);
    }
  };

  const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 20 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      {...layout}
      onFinish={onFinish}
      validateMessages={validateMessages}
      id="form"
      layout="vertical"
      size="middle"
    >
      <h6>أحصل على إستشارة مجانية حول قضاء عطلتك في تركيا</h6>
      <Form.Item
        name={['user', 'name']}
        label="الإسم الكامل"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'phone']}
        label="رقم الواتس آب"
        rules={[{ required: true, message: 'يرجى كتابة رقم هاتفك' }]}
      >
        <Input.Group compact>
          <Input style={{ width: '70%' }} />
          <Select
            allowClear
            showArrow
            filterOption={false}
            showSearch
            style={{ width: '30%', border: '1px solid #fff' }}
            placeholder="الرمز الدولي"
            onFocus={handleFetchPhones}
            onChange={handleFetchPhones}
            onSearch={handleSearch}
            notFoundContent={null}
            labelInValue
          >
            {phones?.map((p) => (
              <Option key={p.label} value={p.label}>
                <Image
                  loading="lazy"
                  width="20"
                  height="12"
                  src={p.flag}
                  alt={p.label}
                />
                <b style={{ margin: '0 5px', display: 'inline-block' }}>
                  {p.label}
                </b>
              </Option>
            ))}
          </Select>
        </Input.Group>
      </Form.Item>

      <Form.Item name={['user', 'timeToCall']} label="الوقت المفضل للتواصل">
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          onChange={onChange}
          onOk={onOk}
        />
      </Form.Item>
      <Form.Item name={['user', 'details']} label="ملاحظات إضافية">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large">
          أرسل
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
