import { formatDate, getProfileName } from '@/utils/index';
import { Note } from '@/utils/types';
import { Avatar, List } from 'antd';
import React, { FC } from 'react';

const ContactNotes: FC<{ data?: Note[] }> = ({ data }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.author.profile?.avatar} />}
            title={getProfileName(item.author)}
            description={`${formatDate(item.created, true)}`}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
};

export default ContactNotes;
