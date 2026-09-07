module.exports = (req, res) => {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const baseUrl = `${protocol}://${host}`;
  
  const pages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/exchange', priority: '0.8', changefreq: 'weekly' },
    { path: '/sportsbook', priority: '0.8', changefreq: 'weekly' },
    { path: '/live-casino', priority: '0.8', changefreq: 'weekly' },
    { path: '/slots', priority: '0.8', changefreq: 'weekly' },
    { path: '/tournaments', priority: '0.8', changefreq: 'weekly' },
    { path: '/promotions', priority: '0.8', changefreq: 'weekly' },
    { path: '/faq', priority: '0.8', changefreq: 'monthly' },
    { path: '/casino-vip', priority: '0.5', changefreq: 'monthly' },
    { path: '/responsible-gaming', priority: '0.5', changefreq: 'monthly' },
    { path: '/aboutus', priority: '0.5', changefreq: 'monthly' },
    { path: '/affiliate', priority: '0.5', changefreq: 'monthly' },
    { path: '/contactus', priority: '0.5', changefreq: 'monthly' },
    { path: '/kyc', priority: '0.5', changefreq: 'monthly' },
    { path: '/privacypolicy', priority: '0.5', changefreq: 'monthly' },
    { path: '/termsandcondition', priority: '0.5', changefreq: 'monthly' },
    { path: '/disconnectionpolicy', priority: '0.5', changefreq: 'monthly' },
    { path: '/Jeet-Privilege', priority: '0.5', changefreq: 'monthly' },
    { path: '/login', priority: '0.3', changefreq: 'monthly' },
    { path: '/register', priority: '0.3', changefreq: 'monthly' }
  ];
  
  const today = new Date().toISOString().split('T')[0];
  
  const urls = pages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
};
