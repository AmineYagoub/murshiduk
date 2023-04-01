import { Divider, Layout, Row, Space } from 'antd';

import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { App } from '@/utils/types';
import { mq } from '@/utils/index';

const { Footer } = Layout;

export const Copyright = () => (
  <>
    <small>
      جميع الحقوق محفوظة لموقع السياحة &copy; {new Date().getFullYear()}
    </small>
    <small>
      أي علامات تجارية أو شعارات مستخدمة في هذا الموقع هي ملك لأصحابها.
    </small>
  </>
);

const NewFooter = styled(Footer)((props) =>
  mq({
    zIndex: 1,
    backgroundImage: 'linear-gradient(to right, #29323c, #122639, #29323c)',
    color: '#f3b91d',
    height: [300, 300, 200],
    '.ant-row': {
      margin: '1.4em auto',
      a: {
        display: 'inline-block',
        marginBottom: [15, 15, 0],
      },
    },
    small: {
      display: 'inline-block',
      width: '100%',
      margin: 5,
      textAlign: 'center',
    },
    a: {
      color: 'inherit',
    },
  })
);

const BlogFooter = ({
  siteData,
  color = 'white',
}: {
  siteData: App;
  color?: string;
}) => {
  return (
    <NewFooter color={color}>
      <Row justify="center" align="middle">
        <Link href="/blog" rel="noopener noreferrer" target="_blank">
          المدونة
        </Link>
        <Divider type="vertical" />
        <Link href="/community/about" rel="noopener noreferrer" target="_blank">
          حول الموقع
        </Link>
        <Divider type="vertical" />
        <Link href="/community/terms" rel="noopener noreferrer" target="_blank">
          الشروط و الأحكام
        </Link>
        <Divider type="vertical" />
        <Link
          href="/community/privacy"
          rel="noopener noreferrer"
          target="_blank"
        >
          سياسة الخصوصية
        </Link>
        <Divider type="vertical" />
        <Link
          href="/community/contact"
          rel="noopener noreferrer"
          target="_blank"
        >
          تواصل معنا
        </Link>
      </Row>
      <Row justify="center" align="middle">
        <Space>
          <a
            href={siteData?.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icons/social/facebook.png"
              width={32}
              height={32}
              alt="follow us on facebook"
            />
          </a>
          <a
            href={siteData?.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icons/social/twitter.png"
              width={32}
              height={32}
              alt="follow us on twitter"
            />
          </a>
          <a
            href={siteData?.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icons/social/instagram.png"
              width={32}
              height={32}
              alt="follow us on instagram"
            />
          </a>
          <a
            href={siteData?.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icons/social/youtube.png"
              width={32}
              height={32}
              alt="follow us on youtube"
            />
          </a>
        </Space>
      </Row>
      <Row justify="center" align="middle">
        <Copyright />
      </Row>
    </NewFooter>
  );
};

export default BlogFooter;
