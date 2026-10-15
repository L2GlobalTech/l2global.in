const routes = {
'AWS Cloud Services':'aws-cloud-services', 'AI & Machine Learning':'ai-machine-learning',
'Cloud & DevOps Consulting':'cloud-devops-consulting', 'IT Support & Maintenance':'support-maintenance',
'Data Science':'data-science', 'Software Testing & QA':'software-testing', 'API Integration':'api-integration',
'Oracle Managed Services':'oracle-consulting-managed-services', 'Web Development':'web-development',
'Salesforce Consulting':'salesforce-consulting-implementation', 'SAP Consulting':'sap',
'MuleSoft Integration':'mulesoft-integration-services',
};
const clean = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g,'&').trim();
(async () => {
 const results = await Promise.all(Object.entries(routes).map(async ([service,slug]) => {
  try {
   const response = await fetch(`https://www.l2global.in/services/${slug}`, { signal: AbortSignal.timeout(20000) });
   const html = await response.text();
   return {service,slug,status:response.status,title:clean(html.match(/<title>(.*?)<\/title>/s)?.[1] || ''),
    h1:[...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)].map(m=>clean(m[1])),
    canonical:html.match(/<link rel="canonical" href="([^"]+)"/)?.[1],
    noindex:/<meta name="robots" content="[^"]*noindex/.test(html),
    description:html.match(/<meta name="description" content="([^"]+)"/)?.[1]};
  } catch { return {service,slug,error:'HTTP check unavailable'}; }
 }));
 console.log(JSON.stringify(results,null,2));
})();
