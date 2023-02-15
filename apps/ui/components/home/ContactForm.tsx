import {
  Col,
  Row,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  InputNumber,
  Result,
} from 'antd';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Logger } from '@/utils/Logger';
import { FocusEvent, useState } from 'react';
import { ContactCreateInput } from '@/utils/types';
import { useCreateContact } from '@/hooks/contact/mutation.hook';
import { mq } from '@/utils/index';

const { RangePicker } = DatePicker;

export type PhoneType = {
  label: string;
  flag: string;
  country: string;
};

const { Option } = Select;

const StyledResult = styled(Result)({
  marginTop: '25vh',
  '.ant-result-title': {
    color: '#fff',
    fontSize: '2.5rem !important',
  },
  '.ant-result-subtitle': {
    color: '#fff',
  },
});

const StyledForm = styled(Form)(
  mq({
    top: '75px',
    right: '50%',
    width: '100%',
    maxWidth: 650,
    position: 'absolute',
    fontFamily: 'inherit',
    padding: ['0 2em', '0 2em', 0],
    transform: 'translateX(50%) !important',
    input: {
      background: 'transparent',
      border: '2px solid #fff',
      color: 'floralwhite !important',
      fontWeight: 'bold',
    },
    textArea: {
      background: 'transparent',
      border: '2px solid #fff',
      color: 'floralwhite !important',
      fontWeight: 'bold',
    },
    '.ant-select-selector': {
      border: '1px solid #fff !important',
      background: 'floralwhite !important',
    },
    '.ant-picker': {
      background: 'transparent',
      border: '2px solid #fff',
      color: 'floralwhite',
      fontWeight: 'bold',
      '& ::placeholder': {
        color: '#ccc !important',
      },
      svg: {
        color: '#ccc !important',
      },
    },
    '.ant-input-number': {
      background: 'transparent',
      border: '2px solid #fff',
      color: 'floralwhite',
      fontWeight: 'bold',
      width: '100%',
    },

    label: {
      color: '#fff !important',
    },
    button: {
      width: 200,
    },
    h6: {
      color: '#fff',
      fontSize: '1.3rem',
      fontWeight: 'bold',
      marginBottom: '1.5em',
    },
  })
);

const ContactForm = () => {
  const { mutateAsync, isLoading } = useCreateContact();
  const [isSubmitForm, setSubmitForm] = useState(false);
  const [phones, setPhones] = useState<PhoneType[]>([]);
  const [phonesStor, setPhonesStor] = useState<PhoneType[]>([]);
  const [dateString, setDateString] = useState<string | [string, string]>([
    '',
    '',
  ]);

  const onChange = (_, dateString: [string, string] | string) => {
    setDateString(dateString);
  };

  const handleFetchPhones = (e: FocusEvent<HTMLElement, Element> | null) => {
    if (phones.length === 0) {
      fetch('/api/data/countries')
        .then((res) => res.json())
        .then(({ data }) => {
          const phones = data.map((country) => ({
            label: country.phone,
            flag: country.flag,
            country: country.label,
          }));

          setPhones(phones);
          setPhonesStor(phones);
        })
        .catch((e) => Logger.log(e));
    } else {
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

  const onFinish = async (values: ContactCreateInput) => {
    values.country = phonesStor.find(
      (el) => el.label === values.phoneCode
    ).country;
    values.flightTimeStart = new Date(dateString[0]);
    values.flightTimeEnd = new Date(dateString[1]);
    try {
      const { ok } = await mutateAsync(values);
      setSubmitForm(ok);
    } catch (error) {
      Logger.log(error);
    }
  };

  return !isSubmitForm ? (
    <StyledForm onFinish={onFinish} layout="vertical" size="middle">
      <Row gutter={8} justify="center">
        <h6>أحصل على إستشارة مجانية حول قضاء عطلتك في تركيا</h6>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            name="name"
            label="الإسم الكامل"
            rules={[{ required: true, message: 'يرجى كتابة إسمك الكامل' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item label="رقم الواتس آب" required>
            <Input.Group compact>
              <Form.Item
                noStyle
                name="phone"
                rules={[{ required: true, message: 'يرجى كتابة رقم هاتفك' }]}
              >
                <Input style={{ width: '70%' }} />
              </Form.Item>
              <Form.Item
                noStyle
                name="phoneCode"
                rules={[
                  { required: true, message: 'يرجى تحديد الرمز الدولي لبلدك' },
                ]}
              >
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
                >
                  {phones?.map((p) => (
                    <Option key={p.label} value={p.label} label={p.label}>
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
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="تاريخ الرحلة">
        <RangePicker
          showTime={false}
          format="YYYY-MM-DD"
          onChange={onChange}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Row justify="center" gutter={8}>
        <Col xs={24} sm={24} md={12}>
          <Form.Item label="عدد الأشخاص البالغين" name="adults">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item label="عدد الأطفال" name="children">
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="details" label="ملاحظات إضافية">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
        >
          أرسل
        </Button>
      </Form.Item>
    </StyledForm>
  ) : (
    <StyledResult
      status="success"
      title="تم إستقبال طلبك بنجاح !"
      subTitle="سيتم التواصل معك خلال الساعات القادمة, سنكون سعداء جداً بخدمتك."
    />
  );
};

export default ContactForm;
