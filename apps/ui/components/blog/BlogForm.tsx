import { FormEvent, useEffect, useState } from 'react';
import { Form, Button, notification, Input } from 'antd';
import { Jodit } from 'jodit';
import Head from 'next/head';
import Loading from '../common/Loading';

const BlogForm = ({ onFinish }: { onFinish?: (values: any) => void }) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState<string>('');
  const [loadData, setLoading] = useState<boolean>(false);
  const data = null;
  const loading = false;

  useEffect(() => {
    const editor = Jodit?.make('#editor', {
      height: 650,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
    });
    editor.e.on('change', () => setContent(editor.value));
    if (data) {
      editor.value = data?.findAppConfig.agreement;
    }
    return () => {
      editor.destruct();
    };
  }, [data]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/jodit@3.23.2/build/jodit.es2018.min.css"
        />
      </Head>
      {loadData ? (
        <Loading />
      ) : (
        <Form
          wrapperCol={{ span: 18 }}
          form={form}
          size="large"
          layout="vertical"
          scrollToFirstError
          onFinish={onFinish}
          onSubmitCapture={onSubmit}
        >
          <Form.Item label="العنوان" required name="title">
            <Input />
          </Form.Item>
          <Form.Item label="المحتوى" required name="agreement">
            <textarea id="editor" name="editor"></textarea>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default BlogForm;
