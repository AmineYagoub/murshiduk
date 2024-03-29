import { Blog } from './blog.type';
import { Category } from './category.type';

export type Bio = {
  year: number;
  image: string;
  content: string;
};

export type CarouselEl = {
  lg: string;
  md: string;
  sm: string;
};

export type App = {
  title?: string;
  description?: string;
  bio?: Bio[];
  address?: {
    addressLocality: string;
    addressRegion: string;
    latitude: string;
    longitude: string;
    postalCode: string;
    streetAddress: string;
  };
  carousel?: CarouselEl[];
  whyUsContent?: string;
  agreement?: string;
  privacy?: string;
  aboutUs?: string;
  contactEmail?: string;
  whatsApp?: string;
  messengerId?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  playStorUrl?: string;
  appStorUrl?: string;
};

export type DashboardCountry = {
  name: string;
  value: number;
};

export type Dashboard = {
  users: number;
  blogs: number;
  tags: number;
  comments: number;
  countries: DashboardCountry[];
};

export type HomePageData = {
  blogs: Blog[];
  categories: Category[];
};
