import { NextPage } from 'next';
import { ReactElement } from 'react';

export type NextPageWithLayout<P = unknown, IP = unknown> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
};
