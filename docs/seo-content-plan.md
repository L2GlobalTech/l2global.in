# SEO content plan — owner database updates

The code branch `fix/seo-content-readiness` adds visible service breadcrumbs, BreadcrumbList data, links to other published services, CMS-controlled hero/about button labels and the existing solutions text section. It also removes unsupported service-directory wording. No database records were changed.

## Priority 1: repair existing service intent

- SAP: replace the mixed SAP / Cloud & DevOps H1. Suggested combined heading: **SAP Consulting, Implementation & Support Services**. The visible H1 combines `hero_title`, `hero_highlight` and `hero_logo_text`: review all three together.
- Salesforce: distinguish implementation/integration (`salesforce-services`) from advisory (`salesforce-crm-consulting`). Give each a distinct audience, scope, examples and FAQs. If they cover the same need, decide which to keep before requesting a redirect.
- AWS: describe actual migration, infrastructure, security, monitoring and DevOps deliverables. Remove promises about availability, savings or free work unless supported.
- Oracle: keep the corrected public slug `oracle-consulting-managed-services`; existing typo redirects are already present.

## Priority 2: publish missing offerings only when delivery is confirmed

Create substantive, distinct AI/ML, DevOps and IT Support records if L2 Global provides them. Suggested slugs: `ai-machine-learning`, `cloud-devops-consulting`, `support-maintenance`. Avoid duplicate AI pages with the same content. Agentforce and SAP AI should be separate only when their platform-specific scope warrants it.

For each record include the buyer problem, specific deliverables, engagement process, prerequisites, support scope, one verified project example and useful questions about scope, timelines and handover. Publish only when reviewed; a short placeholder is insufficient even though the technical publication filter only requires an active record, valid slug, title and description.

## Field checklist

| CMS field | Editorial guidance |
| --- | --- |
| `title`, `slug` | Distinct service name; stable lowercase hyphenated URL. Changing an existing URL requires a redirect. |
| `meta_title` | Primary service intent + L2 Global; avoid repeating the brand or identical titles. |
| `meta_description` | Specific offering and reason to contact; readable plain text, no unsupported guarantees. |
| `hero_title`, `hero_highlight`, `hero_logo_text` | Together form one clear H1. Avoid mixing unrelated services. |
| `hero_description`, `about_description` | Explain who the service helps and the concrete work delivered. Plain text. |
| `hero_cta_text`, `about_cta_text` | Accurate labels such as Discuss Your Project or Request a Quote; both now render from the database. |
| `hero_cta_url`, `about_cta_url`, `cta_url` | Real contact/booking destination; `/contact-us` is the safe default. |
| `capabilities` | Distinct items with title and description; remove repeated keyword lists. |
| `solutions_title`, `solutions_highlight`, `solutions_logo_text`, `solutions_description` | Existing solution heading and plain-text body now render when the body is present. Images and solution badges are not included in this new section. |
| `results_stats`, `hero_badges` | Use only documented, service-relevant facts. Do not invent certifications, savings or results. |
| `faqs` | Specific questions and useful answers, including constraints. FAQ markup does not guarantee a Google rich result. |
| `is_active` | Keep unfinished services inactive. Publishing a valid active record adds it to public service navigation and sitemap. |

## Priority 3: evidence and measurement

Verify employee/client/project counts, partner tiers, awards, testimonials and geographic claims across the whole site. Add permission-backed case studies with the problem, work delivered and evidence of outcomes. Avoid generic city/country pages without distinct local value.

After the code is reviewed and deployed, check the combined H1, title, canonical, breadcrumb, contact buttons, solutions section and internal links on each updated page. Check Google Search Console URL Inspection and submit the sitemap; monitor indexing, queries, qualified leads and contact events over the next 4–8 weeks. Confirm GA4 receives `contact_intent` and successful `generate_lead` events before using them as reporting metrics.

References: [Google breadcrumb guidance](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
