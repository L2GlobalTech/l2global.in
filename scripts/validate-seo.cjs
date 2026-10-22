const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, dependencies, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(code, { exports, require: name => {
    if (!(name in dependencies)) throw new Error(`Unexpected import: ${name}`);
    return dependencies[name];
  }, Map, Set, Error, URL, Response, process: { env: {} }, ...globals });
  return exports;
}
async function main() {
  let records = [{ title: 'AWS Cloud Services', slug: 'aws-cloud-services', is_active: true, hero_description: 'CMS cloud description', sort_order: 0 },
    { title: 'Inactive', slug: 'inactive', is_active: false, hero_description: 'Hidden' },
    { title: 'Thin', slug: 'thin', is_active: true }];
  let failure = false;
  const query = { select() { return this; }, eq() { return this; }, order() { return this; },
    async range() { return { data: records, error: failure ? {} : null }; } };
  const services = load('lib/publicServices.ts', {
    react: { cache: fn => fn }, '@/configs/supabase': { isSupabaseConfigured: () => true, supabase: { from: () => query } },
    '@/app/(asgard)/asgard/services/action': { normalizeService: row => row },
  });
  assert.equal(services.normalizeServiceSlug('oracle-consulting-managed-servicesss'), 'oracle-consulting-managed-services');
  assert.equal((await services.getPublishedServices()).length, 1);
  assert.equal(await services.getPublishedService('aws'), null);
  assert.equal(await services.getPublishedService('inactive'), null);
  assert.equal(await services.getPublishedService('thin'), null);
  assert.equal(await services.getPublishedService('bad,slug'), null);
  assert.equal((await services.getPublishedService('aws-cloud-services')).title, 'AWS Cloud Services');
  records.push({ ...records[0] });
  await assert.rejects(services.getPublishedServices(), /Duplicate/);
  records.pop(); failure = true;
  await assert.rejects(services.getPublishedServices(), /Unable/); failure = false;
  const page = load('app/(web)/services/[slug]/page.tsx', {
    '@/containers/services/ServiceDetailContainer': {},
    '@/components/web/services/ServiceExploreMore': { default: () => null },
    'next/link': { default: 'a' },
    'react/jsx-runtime': { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
    'next/navigation': { notFound: () => { throw new Error('404'); } }, '@/lib/publicServices': services,
  });
  const serviceRender = await page.default({ params: Promise.resolve({ slug: 'aws-cloud-services' }) });
  const serviceSchemas = JSON.parse(serviceRender.props.children[0].props.dangerouslySetInnerHTML.__html);
  assert.equal(serviceSchemas[1]['@type'], 'BreadcrumbList');
  assert.equal(serviceSchemas[1].itemListElement[2].item, 'https://www.l2global.in/services/aws-cloud-services');
  assert.equal(serviceRender.props.children[2], false); // No links to inactive, thin or current services.
  const metadata = await page.generateMetadata({ params: Promise.resolve({ slug: 'aws-cloud-services' }) });
  assert.equal(metadata.alternates.canonical, 'https://www.l2global.in/services/aws-cloud-services');
  assert.equal(metadata.description, 'CMS cloud description');
  assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
  await assert.rejects(page.generateMetadata({ params: Promise.resolve({ slug: 'unknown' }) }), /404/);
  const sitemap = load('app/sitemap.ts', {
    '@/lib/publicServices': services,
    '@/app/(asgard)/asgard/blogs/action': { getPublicBlogs: async () => [{ slug: 'test' }, { slug: 'test' }] },
  });
  const entries = await sitemap.default();
  assert.equal(entries.length, new Set(entries.map(item => item.url)).size);
  assert(entries.every(item => item.url.startsWith('https://www.l2global.in') && !('lastModified' in item)));
  assert(entries.some(item => item.url === metadata.alternates.canonical));
  assert(!entries.some(item => item.url.endsWith('/thin') || item.url.endsWith('/agentforce-ai')));
  const homeServices = load('components/web/Services.tsx', {
    react: {}, 'lucide-react': {}, 'next/link': { default: 'a' },
    './SectionHeader': 'header', './Divider': 'div',
    'react/jsx-runtime': { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
    '@/actions/servicesAction': { fetchServices: async () => (await services.getPublishedServices()).map(service => ({
      title: service.title, desc: service.hero_description, href: `/services/${service.slug}`,
    })) },
  });
  const links = node => {
    if (!node) return [];
    if (Array.isArray(node)) return node.flatMap(links);
    return [...(node.type === 'a' ? [node.props.href] : []), ...links(node.props?.children)];
  };
  assert.equal(JSON.stringify(links(await homeServices.default())), JSON.stringify(['/services/aws-cloud-services', '/services']));
  failure = true;
  assert.equal(JSON.stringify(links(await homeServices.default())), JSON.stringify(['/services']));
  failure = false;
  let blog = null;
  const blogPage = load('app/(web)/blog/[slug]/page.tsx', {
    '@/containers/web/BlogPostContainer': {}, react: {},
    'react/jsx-runtime': { jsx: () => null, jsxs: () => null },
    'next/navigation': { notFound: () => { throw new Error('404'); }, permanentRedirect: () => { throw new Error('308'); } },
    '@/app/(asgard)/asgard/blogs/action': { getPublicBlogs: async () => [], getPublicBlogBySlug: async () => blog },
  });
  const blogParams = { params: Promise.resolve({ slug: 'test' }) };
  const missingBlogMetadata = await blogPage.generateMetadata(blogParams);
  assert.equal(missingBlogMetadata.robots.index, false);
  assert.equal(missingBlogMetadata.title, 'Page Not Found');
  await assert.rejects(blogPage.default(blogParams), /404/);
  blog = { slug: 'test', title: 'Real CMS Article', excerpt: 'Actual excerpt' };
  const blogMetadata = await blogPage.generateMetadata(blogParams);
  assert.equal(blogMetadata.title, blog.title);
  assert.equal(blogMetadata.alternates.canonical, 'https://www.l2global.in/blog/test');
  await blogPage.default(blogParams);
  records.push({ title: 'Oracle Managed Services', slug: 'oracle-consulting-managed-servicesss', is_active: true, hero_description: 'Actual Oracle service' });
  assert.equal((await services.getPublishedService('oracle-consulting-managed-services')).title, 'Oracle Managed Services');
  records.pop();
  const { resolveServiceCta } = load('lib/serviceCta.ts', {});
  for (const value of [null, undefined, '', '  ', '#', ' # ']) assert.equal(resolveServiceCta(value), '/contact-us');
  for (const value of ['/contact-us', 'https://example.com/book', '#contact']) assert.equal(resolveServiceCta(value), value);
  blog = { ...blog, slug: 'canonical-test' };
  await assert.rejects(blogPage.default(blogParams), /308/);
  let blogRows = [{ id: '1', slug: 'real-post', title: 'Real post', content: '<p>Real content</p>' },
    { id: '2', slug: 'empty-post', title: 'Empty', content: '' }];
  let blogFailure = false;
  const blogQuery = { select() { return this; }, order() { return this; },
    async range(start, end) { return { data: blogRows.slice(start, end + 1), error: blogFailure ? {} : null }; } };
  const publishedBlogs = load('lib/publicBlogs.ts', {
    react: { cache: fn => fn },
    '@/configs/supabase': {
      isSupabaseConfigured: () => true,
      supabase: { from: () => blogQuery },
      getSupabaseAdmin: () => ({ from: () => blogQuery }),
    },
    '@/app/(asgard)/asgard/blogs/action': { mapBlogRecordToBlogPost: row => row, slugify: title => title.toLowerCase().replace(/ /g, '-') },
    '@/constants/blogData': { blogPosts: [] },
  });
  assert.equal((await publishedBlogs.getPublishedBlogs()).length, 1);
  assert.equal(await publishedBlogs.getPublishedBlog('missing'), null);
  blogFailure = true;
  await assert.rejects(publishedBlogs.getPublishedBlog('real-post'), /Unable to load/);
  blogFailure = false;
  blogRows.push({ ...blogRows[0] });
  await assert.rejects(publishedBlogs.getPublishedBlogs(), /Duplicate/);
  blogRows = Array.from({length: 1001}, (_, i) => ({ id: String(i), slug: `post-${i}`, title: `Post ${i}`, content: 'Actual article' }));
  assert.equal((await publishedBlogs.getPublishedBlogs()).length, 1001);
  const { canOptimizeServiceImage } = load('lib/serviceImages.ts', {});
  assert.equal(canOptimizeServiceImage('/assets/image.png'), true);
  assert.equal(canOptimizeServiceImage('//other.example/image.png'), false);
  assert.equal(canOptimizeServiceImage('data:image/png;base64,test'), false);
  const configuredImages = load('lib/serviceImages.ts', {}, { process: {env: {NEXT_PUBLIC_SUPABASE_URL: 'https://project.supabase.co'}} });
  assert.equal(configuredImages.canOptimizeServiceImage('https://project.supabase.co/storage/v1/object/public/media/image.png'), true);
  assert.equal(configuredImages.canOptimizeServiceImage('https://other.supabase.co/storage/v1/object/public/media/image.png'), false);
  assert.equal(configuredImages.canOptimizeServiceImage('https://project.supabase.co/private/image.png'), false);
  const blogActions = load('app/(asgard)/asgard/blogs/action.ts', {
    '@/configs/supabase': {supabase: {}, isSupabaseConfigured: () => false},
    '@/actions/mediaAction': {getMediaPublicUrl: () => null},
  });
  const undated = blogActions.mapBlogRecordToBlogPost({ title: 'Actual article', slug: 'actual-article', content: 'Actual content' });
  assert.equal(undated.datePublished, '');
  assert.equal(undated.dateModified, undefined);
  assert.equal(undated.serviceLink, '/services');
  const events = [];
  let clickHandler;
  class AnchorTarget {
    constructor(href) { this.href = href; }
    closest() { return this; }
    getAttribute() { return this.href; }
  }
  const tracking = load('components/shared/ConversionTracking.tsx', {
    react: {useEffect: fn => fn()}, '@/lib/gtag': {trackEvent: (name, params) => events.push({name, params})},
  }, { document: {addEventListener: (name, fn) => { clickHandler = fn; }},
    window: {location: {origin: 'https://www.l2global.in', pathname: '/services/aws-cloud-services'}}, Element: AnchorTarget });
  tracking.default();
  for (const href of ['tel:+4412345678', 'https://wa.me/4412345678?text=private', 'https://calendly.com/l2global/discovery', '/contact-us?email=private', 'https://other.example/contact-us']) clickHandler({target: new AnchorTarget(href)});
  assert.equal(events.length, 4);
  assert.deepEqual(events.map(event => event.params.channel), ['phone', 'whatsapp', 'booking', 'contact']);
  assert(!JSON.stringify(events).includes('private') && !JSON.stringify(events).includes('4412345678'));
  const llms = load('app/llms.txt/route.ts', { '@/lib/publicServices': services });
  const llmsBody = await (await llms.GET()).text();
  assert(llmsBody.includes('https://www.l2global.in/services/aws-cloud-services'));
  assert(!llmsBody.includes('/services/agentforce-ai'));
  assert(!fs.readFileSync('app/layout.tsx', 'utf8').includes('hrefLang='));
  console.log('SEO validation passed: publication, exact routes, missing records, outage handling, duplicate slugs, metadata, sitemap, homepage publication, blog outages/pagination, canonical aliases, CTA destinations, content discovery and hreflang.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
