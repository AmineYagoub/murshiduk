import config from '@/config/App';
import ky from 'ky';
export * from './AppRoutes';
export * from './Logger';
export * from './Types';
export * from './animation/WebGLCarousel';

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

export const formatDate = (date) =>
  new Intl.DateTimeFormat('ar-EG', {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    calendar: 'arabic',
    dayPeriod: 'short',
  }).format(new Date(date));

export const readingTime = (article: HTMLDivElement) => {
  const text = article.innerText;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
};
