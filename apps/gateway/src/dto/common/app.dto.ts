export class UpdateAppConfigDto {
  title?: string;

  description?: string;

  bio?: {
    year: number;
    content: string;
    image: string;
  }[];

  carousel: string[];

  agreement?: string;

  privacy?: string;

  aboutUs?: string;

  contactEmail?: string;

  youtubeUrl?: string;

  twitterUrl?: string;

  facebookUrl?: string;

  instagramUrl?: string;

  playStorUrl?: string;

  appStorUrl?: string;
}
