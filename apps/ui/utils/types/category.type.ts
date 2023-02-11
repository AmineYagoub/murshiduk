import { OrderByType } from './blog.type';

export type Category = {
  id: string;
  title: string;
  slug: string;
  parent?: Category;
  blogs?: { id: string }[];
};

export type CategoryDataIndex = keyof Category;

export const CategoryFields: { [P in CategoryDataIndex]: P } = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  parent: 'parent',
  blogs: 'blogs',
};

export type WhereCategoryParams = {
  search?: string;
};
export type OrderCategoryByParams = {
  created?: OrderByType;
  updated?: OrderByType;
};

export interface CategoryPaginationDto {
  skip: number;
  take: number;
  where?: WhereCategoryParams;
  orderBy?: OrderCategoryByParams;
}

export interface CategoryResponse {
  total: number;
  data: Category[];
}

export type CategoryCreateInput = {
  id?: string;
  title: string;
  categories?: {
    value: string;
  };
  parentId?: string;
};
