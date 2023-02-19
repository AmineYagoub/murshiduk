/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://enjoystickk.com',
  generateRobotsTxt: true, // (optional)
  exclude: ['/admin/*', '/auth/*'],
  sourceDir: 'dist/apps/ui/.next',
  outDir: 'dist/apps/ui/public',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin',
      },
      {
        userAgent: '*',
        disallow: '/auth',
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
