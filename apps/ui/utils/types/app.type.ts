export type App = {
  title?: string;
  description?: string;
  bio?: string;
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
