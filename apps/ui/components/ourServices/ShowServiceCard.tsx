import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card } from 'antd';
import { Service } from '@/utils/types';
import { baseS3Url } from '@/utils/index';

const { Meta } = Card;

const ShowServiceCard: FC<{ service: Service }> = ({ service }) => {
  return (
    <Card
      style={{ width: 350, height: 550 }}
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
      <Link href={`our-services/${service.slug}`}>
        <Button
          type="primary"
          style={{ padding: '0 1.5em', marginTop: '1.5em' }}
        >
          التفاصيل
        </Button>
      </Link>
    </Card>
  );
};

export default ShowServiceCard;
