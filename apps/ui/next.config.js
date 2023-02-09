//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    config.module.rules.push({
      test: /\.glsl$/,
      loader: 'webpack-glsl-loader',
    });
    return config;
  },
  reactStrictMode: true,
  compiler: {
    emotion: true,
    // removeConsole: true,
  },
  transpilePackages: ['antd'],
  images: {
    domains: ['flagcdn.com', 'www.travellwd.com'],
  },
  nx: {
    svgr: false,
  },
};

module.exports = withNx(nextConfig);
