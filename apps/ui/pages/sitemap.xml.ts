//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
      <url>
        <loc>https://www.murshiduk.com/</loc>
        <lastmod>2023-05-13T17:16:42+00:00</lastmod>
      </url>
      <url>
        <loc>https://www.murshiduk.com/blog</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://www.murshiduk.com/community/contact</loc>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://www.murshiduk.com/community/about</loc>
        <priority>0.8</priority>
      </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  //const request = await fetch(EXTERNAL_DATA_URL);
  //const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap([]);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
