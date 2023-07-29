import { OrderByType } from './blog.type';

export type Review = {
  id: string;
  name: string;
  email: string;
  rate: string;
  country: string;
  published: boolean;
  details: string;
  created: string;
};

export type ReviewCreateInput = {
  name: string;
  email: string;
  rate: string;
  country?: string;
  details?: string;
};

export type ReviewDataIndex = keyof Review;

export const ReviewFields: { [P in ReviewDataIndex]: P } = {
  id: 'id',
  name: 'name',
  email: 'email',
  country: 'country',
  published: 'published',
  rate: 'rate',
  details: 'details',
  created: 'created',
};

export type WhereReviewParams = {
  search?: string;
  published?: boolean;
};
export type OrderReviewByParams = {
  created?: OrderByType;
  updated?: OrderByType;
};

export interface ReviewPaginationDto {
  skip: number;
  take: number;
  where?: WhereReviewParams;
  orderBy?: OrderReviewByParams;
}

export interface ReviewResponse {
  total: number;
  data: Review[];
}
