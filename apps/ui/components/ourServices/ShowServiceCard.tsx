import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card } from 'antd';
import { Service } from '@/utils/types';
import { baseS3Url } from '@/utils/index';

const { Meta } = Card;

const ShowServiceCard: FC<{ service: Service }> = ({ service }) => {
  const path = service.type === 'SERVICE' ? 'our-services' : 'our-travels';
  return (
    <Card
      style={{ maxWidth: 350, height: 550 }}
      cover={
        <Image
          alt={service.title}
          src={`${baseS3Url}/${service.image}`}
          width={350}
          height={350}
        />
      }
    >
      <Meta
        title={service.title}
        description={`${service.description.slice(0, 100)} ... `}
      />
      <Link
        href={`${path}/${service.slug}`}
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
