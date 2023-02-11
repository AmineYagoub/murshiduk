import { Profile, User } from './user.type';
import { Category } from './category.type';

export type Blog = {
  id: string;
  title: string;
  slug: string;
  descriptionMeta: string;
  content: string;
  published: boolean;
  created: string;
  updated: string;
  author: User;
  categories: Category[];
  recommended: {
    title: string;
    slug: string;
    created: Date;
    author: {
      profile: Profile;
    };
  }[];
};

export type BlogDataIndex = keyof Blog;

export const BlogFields: { [P in BlogDataIndex]: P } = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  published: 'published',
  author: 'author',
  categories: 'categories',
  content: 'content',
  descriptionMeta: 'descriptionMeta',
  created: 'created',
  updated: 'updated',
  recommended: 'recommended',
};

export enum OrderByType {
  Asc = 'asc',
  Desc = 'desc',
}

export type WhereBlogParams = {
  search?: string;
  tag?: string;
  published?: string;
};
export type OrderBlogByParams = {
  created?: OrderByType;
  updated?: OrderByType;
};

export interface BlogPaginationDto {
  skip: number;
  take: number;
  where?: WhereBlogParams;
  orderBy?: OrderBlogByParams;
}

export interface BlogResponse {
  total: number;
  data: Blog[];
}

export interface BlogCreateInput {
  id?: string;
  title: string;
  content: string;
  descriptionMeta: string;
  authorId: string;
  categories: string[];
}
