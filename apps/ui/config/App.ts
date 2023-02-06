const isProd = process.env.NODE_ENV !== 'development';
const jwtName = 'aoc_jwt';
const refreshJwtName = 'aoc_jwt_ref';
const nonceName = isProd ? '__Host_Fgp_nonce' : 'fgp_nonce';

const config = {
  API_URL: 'http://localhost:3000',
  JWT_TOKEN:
    typeof window === 'undefined' ? null : localStorage.getItem(jwtName),
};
export default config;
