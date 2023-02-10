import {
  Tag,
  Alert,
  Space,
  Select,
  Button,
  Divider,
  Drawer,
  Descriptions,
  Row,
  Form,
} from 'antd';
import { useState } from 'react';
import styled from '@emotion/styled';
import CreateNote from './CreateNote';
import Loading from '../common/Loading';
import { Contact } from '@/utils/types';
import ContactNotes from './ContactNotes';
import { formatDate } from '@/utils/index';
import { useContact } from '@/hooks/contact/query.hook';
import { contactStatusMappedTypes } from '@/utils/Mapper';
import { SaveOutlined, EyeOutlined } from '@ant-design/icons';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { useUpdateContact } from '@/hooks/contact/mutation.hook';

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
    >
      {label}
    </Tag>
  );
};

const StyledDescriptions = styled(Descriptions)({
  table: {
    minHeight: '180px !important',
    boxShadow: 'unset !important',
  },
});

const PreviewContact = ({ id }: { id: string }) => {
  const [form] = Form.useForm();
  const { refetch, isLoading, isError } = useContact(id);
  const { mutateAsync, isLoading: updateLoad } = useUpdateContact();
  const [data, setData] = useState<Contact>();
  const [visible, setVisible] = useState(false);

  const showDrawer = async () => {
    setVisible(true);
    const { data } = await refetch();
    setData(data);
  };

  const onClose = () => {
    setVisible(false);
  };

  const addNoteToList = async () => {
    const { data } = await refetch();
    setData(data);
  };

  const onUpdateContact = async () => {
    const values = await form.validateFields();
    const { ok } = await mutateAsync({
      id,
      status: values.status,
    });
    if (ok) {
      onClose();
    }
  };

  return (
    <>
      <Button
        shape="circle"
        icon={<EyeOutlined />}
        type="primary"
        ghost
        onClick={showDrawer}
      />

      <Drawer
        title="بيانات المتصل"
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
        width={720}
        destroyOnClose
        extra={
          <Space>
            <Button onClick={onClose} htmlType="reset">
              تراجع
            </Button>
            <Button
              onClick={onUpdateContact}
              type="primary"
              icon={<SaveOutlined />}
              htmlType="submit"
              loading={updateLoad}
            >
              حفظ
            </Button>
          </Space>
        }
      >
        {isLoading ? (
          <Loading />
        ) : (
          data && (
            <>
              <StyledDescriptions>
                <Descriptions.Item label="الإسم الكامل">
                  {data?.name}
                </Descriptions.Item>

                <Descriptions.Item label="البلد">
                  {data?.country}
                </Descriptions.Item>

                <Descriptions.Item label="رقم الهاتف">
                  <span dir="ltr">{`+${data?.phoneCode} ${data?.phone}`}</span>
                </Descriptions.Item>
                <Descriptions.Item label="تاريخ التواصل">
                  {formatDate(data?.created, true)}
                </Descriptions.Item>
                <Descriptions.Item label="بداية الرحلة">
                  {formatDate(data?.flightTimeStart)}
                </Descriptions.Item>
                <Descriptions.Item label="نهاية الرحلة">
                  {formatDate(data?.flightTimeEnd)}
                </Descriptions.Item>
                <Descriptions.Item label="عدد البالغين">
                  {data?.adults}
                </Descriptions.Item>
                <Descriptions.Item label="عدد الأطفال">
                  {data?.children}
                </Descriptions.Item>

                <Descriptions.Item label="حالة العميل">
                  <Form
                    form={form}
                    layout="vertical"
                    initialValues={{ status: data?.status }}
                  >
                    <Form.Item name="status" noStyle>
                      <Select
                        showArrow
                        tagRender={tagRender}
                        options={contactStatusMappedTypes}
                        style={{ width: 110 }}
                      />
                    </Form.Item>
                  </Form>
                </Descriptions.Item>
              </StyledDescriptions>
              <h3>ملاحظات المتصل</h3>
              <small>{data?.details || 'لا يوجد ملاحظات'}</small>
              <Divider />
              <Row justify="space-between">
                <h3>ملاحظات الإدارة</h3>
                <CreateNote id={data?.id} addNoteToList={addNoteToList} />
              </Row>
              <ContactNotes
                data={data?.notes.sort(
                  (a, b) =>
                    new Date(b.created).getTime() -
                    new Date(a.created).getTime()
                )}
              />
            </>
          )
        )}

        {isError && (
          <Alert
            message="خطأ"
            description="حدث خطأ أثناء جلب البيانات ، يرجى المحاولة مرة أخرى"
            banner
            closable
            type="error"
            showIcon
          />
        )}
      </Drawer>
    </>
  );
};

export default PreviewContact;
