import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

import { isProd } from '../';

export const APP_CONFIG_REGISTER_KEY = 'appConfig';

export const appConfig = registerAs(APP_CONFIG_REGISTER_KEY, () => ({
  // Host of the API server
  protocol: process.env.API_PROTOCOL || 'http',
  host: process.env.API_HOST || '127.0.0.1',
  port: Number(process.env.API_PORT) || 3000,
  get url() {
    return `${this.protocol}://${this.host}:${this.port}`;
  },
  origin: process.env.ORIGIN_HOST || 'http://localhost:8080',
  jwt: {
    key: process.env.JWT_SECRET || 'secret',
    expiresIn: '720d',
    aud: 'Olympiad Web App',
    iss: 'Olympiad Web App',
    refreshIn: '720d',
    nonceName: isProd ? '__Host_Fgp_nonce' : 'fgp_nonce',
    nonceExpiresIn: 360 * 24 * 60 * 60,
    nonceEncryptAlg: 'aes-192-cbc',
    nonceEncryptKey: process.env.JWT_SECRET || 'secret',
  },
}));

export type AppConfigType = ConfigType<typeof appConfig>;
export const InjectAppConfig = () => Inject(appConfig.KEY);
