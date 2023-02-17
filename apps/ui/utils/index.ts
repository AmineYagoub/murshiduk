import config from '@/config/App';
import ky from 'ky-universal';
export * from './AppRoutes';
export * from './Logger';
export * from './animation/WebGLCarousel';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import relativeTime from 'dayjs/plugin/relativeTime';
import { User } from './types';
import facepaint from 'facepaint';

dayjs.extend(relativeTime);
dayjs.locale('ar');

export const mq = facepaint([
  '@media(min-width: 420px)',
  '@media(min-width: 920px)',
  '@media(min-width: 1120px)',
  '@media(min-width: 1370px)',
  '@media(min-width: 1600px)',
]);

export const api = ky.create({
  prefixUrl: config.API_URL,
  credentials: 'include',
  mode: 'cors',
  headers: {
    'content-type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = config.JWT_TOKEN;
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});

export const formatDate = (date: string | Date, fromNow = false) => {
  return fromNow ? dayjs(date).fromNow() : dayjs(date).format('DD/MM/YYYY');
};

export const readingTime = (article: HTMLDivElement) => {
  const text = article.innerText;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
};

export const getTitleMeta = (siteTitle: string, pageTitle?: string) =>
  pageTitle
    ? `${siteTitle || 'جاري التحميل'} | ${pageTitle}`
    : `${siteTitle || 'جاري التحميل'}`;

export const getProfileName = (user: User) => {
  return user.profile
    ? `${user.profile?.firstName} ${user.profile?.lastName}`
    : 'يرجى إكمال البروفايل الخاص بك';
};

export const getFirstImageFromContent = (content: string) => {
  return content
    .match(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|webp|svg))/)
    ?.shift();
};

export const extractTwitterUserName = (url?: string) => {
  if (!url) return null;
  const match = url.match(/^https?:\/\/(www\.)?twitter.com\/@?(?<handle>\w+)/);
  return match?.groups?.handle ? `@${match.groups.handle}` : null;
};

export const baseUrl = 'https://enjoystickk.com';
export const baseS3Url = 'https://s3.enjoystickk.com';
