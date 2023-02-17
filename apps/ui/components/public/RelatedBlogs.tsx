import React, { FC } from 'react';
import { Avatar, List } from 'antd';
import { formatDate, getProfileName } from '@/utils/index';
import Link from 'next/link';
import { User } from '@/utils/types';

interface DataProp {
  title: string;
  slug: string;
  created: Date;
  author: {
    profile: {
      avatar: string;
      firstName: string;
      lastName: string;
    };
  };
}

const RelatedBlogs: FC<{ data: DataProp[] }> = ({ data }) => {
  return data?.length > 0 ? (
    <>
      <h2>إقرء أيضا</h2>
      <List
        itemLayout="horizontal"
        bordered={false}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.author.profile?.avatar} />}
              title={
                <Link href={`/blog/${item.slug}`}>
                  <h3>{item.title}</h3>
                </Link>
              }
              description={`${getProfileName(
                item.author as User
              )} - ${formatDate(item.created)}`}
            />
          </List.Item>
        )}
      />
    </>
  ) : null;
};

export default RelatedBlogs;
