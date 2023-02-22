const isProd = process.env.NODE_ENV !== 'development';
const jwtName = 'aoc_jwt';

const config = {
  API_URL: isProd ? 'https://api.murshiduk.com' : 'http://localhost:3000',
  JWT_TOKEN:
    typeof window === 'undefined' ? null : localStorage.getItem(jwtName),
  JWT_NAME: jwtName,
  REFRESH_JWT_NAME: 'aoc_jwt_ref',
  NONCE_NAME: isProd ? '__Host_Fgp_nonce' : 'fgp_nonce',
  MINIO: {
    MINIO_HOST: process.env.MINIO_HOST,
    MINIO_SSL: process.env.MINIO_USE_SSL === '1',
    MINIO_KEY: process.env.MINIO_ROOT_USER,
    MINIO_SECRET: process.env.MINIO_ROOT_PASSWORD,
  },
  UPLOAD: {
    avatarUrl: (id: string) => `/api/upload/?id=${id}`,
    UPLOAD_EXT: ['png', 'jpj', 'jpeg', 'webp'],
    UPLOAD_EXT_MIME: ['image/jpeg', 'image/png', 'image/webp'],
    UPLOAD_SIZE: 5,
  },
};
export default config;
