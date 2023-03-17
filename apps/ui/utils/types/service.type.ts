import { OrderByType } from './blog.type';
import { User } from './user.type';

export type Service = {
  id: string;
  title: string;
  slug: string;
  image: string;
  description?: string;
  content: string;
  created: string;
  updated: string;
  author: User;
};

export type ServiceDataIndex = keyof Service;

export const ServiceFields: { [P in ServiceDataIndex]: P } = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  description: 'description',
  image: 'image',
  author: 'author',
  content: 'content',
  created: 'created',
  updated: 'updated',
};

export type WhereServiceParams = {
  search?: string;
};
export type OrderServiceByParams = {
  created?: OrderByType;
  updated?: OrderByType;
};

export interface ServicePaginationDto {
  skip: number;
  take: number;
  where?: WhereServiceParams;
  orderBy?: OrderServiceByParams;
}

export interface ServiceResponse {
  total: number;
  data: Service[];
}

export type ServiceCreateInput = {
  id?: string;
  title: string;
  image: string;
  description?: string;
  content: string;
};
