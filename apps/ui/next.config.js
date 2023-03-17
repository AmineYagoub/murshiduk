//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
  disable: process.env.NODE_ENV !== 'production',
  register: true,
  dynamicStartUrl: true,
});

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  reactStrictMode: true,
  compiler: {
    emotion: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  transpilePackages: ['antd', 'echarts', 'zrender'],
  images: {
    domains: ['flagcdn.com', 's3.murshiduk.com', 's3.enjoystickk.com'],
  },
  nx: {
    svgr: false,
  },
};

module.exports = withPWA(withNx(nextConfig));
