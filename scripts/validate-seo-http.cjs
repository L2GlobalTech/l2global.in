const assert = require('node:assert/strict');
const base = process.env.SEO_TEST_BASE_URL || 'http://127.0.0.1:3107';
(async () => {
 for (const path of ['/services/aws-cloud-services', '/services/unknown-seo-test', '/blog/unknown-seo-test']) {
  const response = await fetch(base+path, {headers:{'user-agent':'Googlebot'}});
  const html = await response.text();
  assert.equal(response.status,404);
  assert(/<meta name="robots" content="[^"]*noindex/.test(html));
  assert(!/href="\/services\//.test(html), 'Missing pages must not advertise unverified services');
  console.log(path, '404 + noindex + no fallback service links (without configured CMS)');
 }
 for (const path of ['/', '/services']) {
  const response = await fetch(base+path, {headers:{'user-agent':'Googlebot'}});
  const html = await response.text();
  assert.equal(response.status,200);
  assert(html.includes(`rel="canonical" href="https://www.l2global.in${path==='/'?'':path}`));
  assert(!html.includes('hreflang='));
  assert(!/href="\/services\//.test(html), 'Unconfigured CMS must not advertise service detail links');
  console.log(path, '200 + www canonical + no global hreflang + no fallback service links');
 }
 for (const [path, destination] of [['/blogs', '/blog'], ['/blogs/legacy-post?utm_source=test', '/blog/legacy-post?utm_source=test']]) {
  const response = await fetch(base+path, {redirect:'manual'});
  assert.equal(response.status,308);
  assert.equal(new URL(response.headers.get('location'),base).pathname + new URL(response.headers.get('location'),base).search, destination);
  console.log(path, '308 →', destination);
 }
 const sitemap = await fetch(base+'/sitemap.xml');
 const xml = await sitemap.text();
 assert.equal(sitemap.status,200);
 const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
 assert.equal(urls.length,new Set(urls).size);
 assert(urls.every(url=>url.startsWith('https://www.l2global.in')));
 assert(!xml.includes('<lastmod>'));
 assert(!urls.some(url=>url.includes('/services/')));
 console.log('sitemap.xml',urls.length,'unique canonical URLs; absent CMS services excluded');
 const slash = await fetch(base+'/services/',{redirect:'manual'});
 assert.equal(slash.status,308); assert.equal(slash.headers.get('location'),'/services');
 console.log('/services/ 308 → /services');
 const image = await fetch(base+'/_next/image?url=%2Fassets%2Fweb%2FService-detail%2FAWS-About.png&w=640&q=75',{headers:{accept:'image/webp'}});
 assert.equal(image.status,200); console.log('Local image optimizer 200',image.headers.get('content-type'));
})().catch(error=>{console.error(error);process.exitCode=1});
