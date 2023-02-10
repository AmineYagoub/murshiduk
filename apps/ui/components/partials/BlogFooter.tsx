import { Divider, Layout, Row, Space } from 'antd';

import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { App } from '@/utils/types';

const { Footer } = Layout;

export const Copyright = () => (
  <>
    <small>
      &copy; جميع الحقوق محفوظة لمنصة أولمبياد النحو العربي{' '}
      {new Date().getFullYear()}
    </small>
    <small>
      أي علامات تجارية أو شعارات مستخدمة في هذا الموقع هي ملك لأصحابها.
    </small>
  </>
);

const NewFooter = styled(Footer)({
  padding: '50px !important',
  height: 230,
  '.ant-row': {
    margin: '1.6em auto',
  },
  small: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
  },
});

const BlogFooter = ({ siteData }: { siteData: App }) => {
  return (
    <NewFooter>
      <Row justify="center" align="middle">
        <Link href="/blog">المدونة</Link>
        <Divider type="vertical" />
        <Link href="/community/about">حول الموقع</Link>
        <Divider type="vertical" />
        <Link href="/community/terms">الشروط و الأحكام</Link>
        <Divider type="vertical" />
        <Link href="/community/privacy">سياسة الخصوصية</Link>
        <Divider type="vertical" />
        <Link href="/community/contact">تواصل معي</Link>
      </Row>
      <Row justify="center" align="middle">
        <Space>
          <a href={siteData?.facebookUrl} target="_blank" rel="noreferrer">
            <Image
              src="/icons/social/facebook.png"
              width={32}
              height={32}
              alt="follow us on facebook"
            />
          </a>
          <a href={siteData?.twitterUrl} target="_blank" rel="noreferrer">
            <Image
              src="/icons/social/twitter.png"
              width={32}
              height={32}
              alt="follow us on twitter"
            />
          </a>
          <a href={siteData?.instagramUrl} target="_blank" rel="noreferrer">
            <Image
              src="/icons/social/instagram.png"
              width={32}
              height={32}
              alt="follow us on instagram"
            />
          </a>
          <a href={siteData?.youtubeUrl} target="_blank" rel="noreferrer">
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