# SEO release and content checklist

Branch: `fix/seo-release-content`, based on remote `master` at `faa0b11`.

## Included code changes

This branch includes the pending PR #13 changes: security patches, published homepage and navigation links, blog alias redirects, missing-blog noindex/404, and service CTA destinations.

Additional changes:
- FAQ self-canonical and simplified title.
- Paginated shared blog publication reads, exclusion of empty/placeholder records, duplicate slug checks and errors on database failures. Genuine missing articles are distinguished from outages.
- Canonical redirects for blog ID/title aliases; article content and metadata share server-provided data instead of refreshing the article after hydration.
- No invented publication/update dates. Article schema uses organization authorship for the editorial team and the existing logo asset.
- Known Oracle typo canonicalized to `/services/oracle-consulting-managed-services`; old typo and Oracle alias permanently redirect. The current CMS record remains untouched and works at the new public URL. Edit the existing CMS record rather than creating a duplicate canonical record.
- `llms.txt` dynamically lists the same published services as the overview and sitemap, uses www URLs, and omits unverified company metrics.
- Local and configured Supabase public-storage hero/about images use Next image optimization; other external/data images retain original delivery.
- Scoped web 404 content prevents duplicated navigation/footer. Global unmatched URLs retain their own shell.
- Removed hardcoded service hero stars/500-enterprise claim and the conflicting 200-certified-professional claim. Other CMS metrics, awards, partner and testimonial claims require verification below.
- `contact_intent` events record channel and page path for contact, phone, WhatsApp and booking links. Successful submissions also emit `generate_lead`. No email, phone number, query string or form text is added to these analytics payloads. Existing consent controls remain authoritative.
- Scoped typography parser override resolves the remaining Moderate dependency findings without downgrading typography. Verified unchanged transformations for 2,111 existing CSS selectors.

## Required CMS/content verification

These are editorial decisions, not code defects that can be safely filled with invented content.

1. Correct SAP's hero fields: the current SAP integration H1 includes unrelated Cloud & DevOps text. Make title, H1, description and capabilities describe the same offering.
2. Confirm Oracle's intended public slug. This branch supports the corrected URL with the current raw CMS typo; keep a single active record for that canonical page.
3. Review 182+ projects, 45+ professionals, 1,682 customers, certifications, SLA/uptime figures, awards, partnerships and testimonials. Establish one approved facts register with evidence, wording, scope and last verification date. Correct unsupported claims in CMS and shared copy before release.
4. Approve actual service scope and content for AI/ML, DevOps, IT Support, Data Science, Testing and Web Development. Do not activate empty or generic placeholder records.
5. Differentiate Salesforce consulting from CRM consulting, and API integration from MuleSoft/SAP integration; use separate customer needs and real deliverables.
6. Confirm primary markets from sales/analytics. Explain genuine offices and remote delivery rather than duplicating city pages.

## Missing-service content briefs

Each proposed service needs: approved title and slug; one clear H1; concise buyer-focused description; actual scope and exclusions; deliverables; delivery approach; relevant use cases; technologies actually supported; engagement expectations; factual FAQs; substantiated case study or evidence where available; image/alt text; meta title/description; contact destination; active state only after review.

| Proposed offering | Questions the delivery owner must answer |
| --- | --- |
| AI & Machine Learning | Which use cases, model types and data requirements are supported? How are evaluation, privacy, deployment and monitoring handled? |
| DevOps | Which cloud platforms, CI/CD, infrastructure-as-code, observability and operational responsibilities are delivered? |
| IT Support | Which systems, service hours, regions, escalation paths and contractual response commitments are offered? |
| Data Science | Which analytics, data preparation, BI, forecasting or modelling deliverables are supported? How does this differ from AI/ML? |
| Testing & QA | Which manual/automated, API, performance and regression testing services exist? Which environments and tools are supported? |
| Web Development | Which types of websites/applications, platforms, integrations, maintenance and handover are delivered? |

## Staging acceptance

- Use Node 22 or later and configured Preview Supabase public URL/key with appropriate read policies. Never put service-role keys in NEXT_PUBLIC variables.
- Verify a real article and a missing article, a simulated database outage (must not be disguised as missing content), canonical alias redirects, and truthful article dates.
- Verify seven existing service records load, Oracle's corrected URL and old aliases, service overview/sitemap/llms agreement, and consultation destinations.
- Verify optimized CMS images and any intentional external-image bypass.
- Check desktop/mobile layouts and one footer on both scoped and global 404 pages.
- Verify analytics in GA4 DebugView with consent and validate successful lead receipt using owner-approved test details. Mark `generate_lead` as a key event and record booked meetings/qualified leads in the CRM. Link GA4 and Search Console as appropriate.
- Measure mobile performance and field Core Web Vitals; no measured performance improvement is claimed here.
- Approve release, merge, deploy production, then verify production responses and submit the sitemap in Search Console.

## Validation record

Production build and TypeScript passed on Node 24.19.0. SEO fixtures passed for publication filters, pagination beyond 1,000 rows, duplicate slugs, outage handling, canonical aliases, CTA fallback, image allowlisting, genuine dates, content discovery and analytics payloads. Local HTTP checks passed for missing-blog/service 404 + noindex, FAQ canonical, Oracle/blog redirects, sitemap/llms filtering and WebP delivery. Browser inspection verified a not-found title and exactly one footer. The final npm audit reports zero vulnerabilities. Typography transformations matched the baseline for 2,111 selectors. Tests used controlled fixtures or an unconfigured local CMS; real CMS-backed staging checks remain required. CMS records, hosting settings and production are not changed by this branch.
