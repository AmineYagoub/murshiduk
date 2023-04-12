import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card } from 'antd';
import { Service } from '@/utils/types';
import { baseS3Url, getServiceLink } from '@/utils/index';

const { Meta } = Card;

const ShowServiceCard: FC<{ service: Service }> = ({ service }) => {
  return (
    <Card
      style={{ width: 350, height: 550, borderRadius: 25, zIndex: 1000 }}
      cover={
        <Image
          width={350}
          height={350}
          alt={service.title}
          loader={() => `${baseS3Url}/${service.image}`}
          src={`${baseS3Url}/${service.image}`}
        />
      }
    >
      <Meta
        title={service.title}
        description={`${service.description.slice(0, 100)} ... `}
      />
      <Link
        href={getServiceLink(service)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Button
          type="primary"
          style={{
            padding: '0 1.5em',
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translate(-50%, 0)',
          }}
        >
          التفاصيل
        </Button>
      </Link>
    </Card>
  );
};

export default ShowServiceCard;
