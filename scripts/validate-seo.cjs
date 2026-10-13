const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, dependencies) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(code, { exports, require: name => {
    if (!(name in dependencies)) throw new Error(`Unexpected import: ${name}`);
    return dependencies[name];
  }, Map, Set, Error });
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
    '@/containers/services/ServiceDetailContainer': {}, 'react/jsx-runtime': { jsx: () => null, jsxs: () => null },
    'next/navigation': { notFound: () => { throw new Error('404'); } }, '@/lib/publicServices': services,
  });
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
  assert(!fs.readFileSync('app/layout.tsx', 'utf8').includes('hrefLang='));
  console.log('SEO validation passed: publication, exact routes, missing records, outage handling, duplicate slugs, metadata, sitemap, homepage publication and hreflang.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
