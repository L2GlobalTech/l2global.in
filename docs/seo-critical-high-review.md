# Critical and High SEO implementation review

Branch: `fix/seo-critical-high`. Live HTTP observations: 13 October 2026. Production was read only; these changes are local and have not been deployed.

## Confirmed fixes

- Removed global regional hreflang links: no distinct translated or regional pages exist in this layout.
- Production non-www redirects to www (308); canonicals, OG URLs, sitemap, robots sitemap reference and structured-data URLs now use the existing www host. Explicit `trailingSlash: false` retains the live 308 slash normalization. The host redirect is managed by production hosting; a contrary application redirect would create a loop.
- Public services use exact CMS slugs, require active records with title and hero/about description, and never fall back to another service or to a hardcoded generic page. Unknown/inactive/contentless records invoke notFound with noindex. Database failures throw rather than masquerading as missing records. Duplicate canonical slugs throw rather than publishing ambiguous pages.
- Shared paginated service reads include records beyond Supabase's default row limit; sitemap and overview use the same publication criteria. Sitemap deduplicates URLs, discovers service slugs from CMS, and omits unverifiable modification dates.
- Homepage and services metadata updated. Service titles omit an existing brand suffix before the layout adds its title template. Metadata uses CMS text and exact canonical URLs with Open Graph and Twitter fields.
- Added CMS-based Service JSON-LD and a published-service ItemList on the overview. No new location, credential or rating claims. FAQ JSON-LD escapes CMS text and excludes questions without answers.
- Removed repeated service fetches after hydration; server-provided content remains the source for rendered copy and metadata.
- Enabled Next image optimization; local hero/about illustrations now use responsive Next images with dimensions and descriptive alt text. Hero loads with priority; about image lazy-loads. CMS string images retain unoptimized delivery to support existing external/data URLs. The Supabase public-storage image host is narrowly allowed when configured. No assets or CSS redesigned.

## Individual service review

The session has no Supabase configuration, so direct CMS inspection, publication status and record-by-record field validation are unavailable. The following are observations of public HTML, not proof that a CMS record exists or is absent. All twelve routes use the shared fixed renderer if a qualifying record exists.

| Service | Checked slug | Live response | Finding |
| --- | --- | --- | --- |
| AWS Cloud Services | `aws-cloud-services` | 200 | Service-specific title/description and one H1; canonical uses redirected non-www host. Host fixed; CMS claims require owner verification. |
| AI & Machine Learning | `ai-machine-learning` | 404 | Missing at checked URL; noindex. CMS record and alternative slug unverified. |
| Cloud & DevOps Consulting | `cloud-devops-consulting` | 200 | Generic indexable fallback, generic H1, no canonical. Fixed by requiring CMS content. |
| IT Support & Maintenance | `support-maintenance` | 200 | Generic indexable fallback, generic H1, no canonical. Fixed by requiring CMS content. |
| Data Science | `data-science` | 200 | Generic indexable fallback, generic H1, no canonical. Fixed by requiring CMS content. |
| Software Testing & QA | `software-testing` | 200 | Generic indexable fallback, generic H1, no canonical. Fixed by requiring CMS content. |
| API Integration | `api-integration` | 200 | Service-specific title/description and one H1; canonical uses redirected non-www host. Host fixed; CMS claims require owner verification. |
| Oracle Managed Services | `oracle-consulting-managed-services` | 200 | Service-specific title/description and one H1; canonical uses redirected non-www host. Host fixed; CMS claims require owner verification. |
| Web Development | `web-development` | 200 | Generic indexable fallback, generic H1, no canonical. Fixed by requiring CMS content. |
| Salesforce Consulting | `salesforce-consulting-implementation` | 200 | Generic indexable fallback, generic H1, no canonical. Fixed by requiring CMS content. |
| SAP Consulting | `sap` | 200 | Service-specific title/description and one H1; canonical uses redirected non-www host. Host fixed; CMS claims require owner verification. H1 includes unrelated Cloud & DevOps text; correct hero fields in CMS after verification. |
| MuleSoft Integration | `mulesoft-integration-services` | 200 | Service-specific title/description and one H1; canonical uses redirected non-www host. Host fixed; CMS claims require owner verification. |

The public service links include `mulesoft-integration-services` and `oracle-consulting-managed-services`, while the old sitemap advertises different slugs. CMS-derived URLs fix this mismatch without inventing redirects. A suspicious `oracle-consulting-managed-servicesss` link is also present in production; the record must be inspected before changing its slug or deciding a redirect.

## Content, headings, links, images and schema

Each service shares ServiceHeroSection (one H1), ServiceAboutSection (H2), capability cards, CMS result statistics, industry/process sections, regional section, FAQs and a contact CTA. The overview produces crawlable links for the same CMS records the route accepts. Detail pages retain links to all services and contact. CMS capabilities/features/FAQs are preserved. Missing hero headings now fall back to the service title; invented default certification/support badges and generic hero/about copy are removed. Existing shared marketing claims, regional copy and global organization data remain editorial review items: no new claims were added, and their accuracy cannot be verified from the repository.

CMS fields available: title/slug, hero title/highlight/description/images/badges/CTA, about title/description/features/image/CTA, capabilities, result statistics, solutions content/image/badges, FAQs, meta title/description, active state and timestamps. The current renderer does not display CMS solutions fields and hardcodes some shared section headings and CTA labels; changing the section design/content contract is outside this verified technical fix. Images without supplied media use existing illustration assets; alt text now identifies the service, without inventing what the illustration depicts.

Large assets confirmed locally include AWS-About, oracle-about, SAP-About, Mulesoft-About, API-About, CRM-About, salesforces-about and the OG image (over 500 KB each). Local image optimization addresses delivery for converted service assets; the social OG asset and unconverted raw images remain unchanged. No measured Core Web Vitals improvement is claimed.

## AI & Machine Learning CMS gap and proposed structure

No verified standalone AI & Machine Learning record is available in this session; the checked public route is 404. Agentforce, SAP AI and Data Science must not be treated as a substitute for an independently verified AI/ML offering. No new page or database record was published.

Proposed CMS structure, requiring approved factual content:
1. Unique service title, canonical slug, meta title and description.
2. H1, concise description of actual AI/ML scope, relevant illustration and contact CTA.
3. Verified capabilities and supported technologies using capability cards.
4. About text, delivery approach, data requirements and supported use cases.
5. Links to related published Data Science, cloud or integration pages.
6. FAQs answered by the delivery team; optional substantiated results only.
7. CTA, active status, and genuine creation/update timestamps.

AWS/AI/ML/IT Support/DevOps terms should be included in overview copy only to the extent supported by publishable CMS offerings. AI/ML was not added as a standalone claim without that evidence.

## Validation

- `npx tsc --noEmit`: passed.
- `node scripts/validate-seo.cjs`: passed publication filtering, missing/inactive/thin records, exact matching, duplicate slugs, database-error handling, metadata, sitemap deduplication and hreflang checks using controlled fixtures.
- `npm run build -- --webpack`: passed. Default Turbopack build stalled under restricted execution and was stopped; webpack is the verified production build path for this session.
- ESLint: neither dependency nor configuration is present; not run.
- `git diff --check`: passed.
- `scripts/audit-live-services.cjs`: read-only live status/metadata audit; reflects production before deployment.
- `node scripts/validate-seo-http.cjs` against the production server: passed homepage/overview 200 and www canonicals, missing-service 404 plus noindex, 15 deduplicated sitemap URLs with no fabricated dates or absent service records, trailing slash 308, and WebP image optimization 200. This script intentionally assumes no CMS configuration.
- No browser visual comparison or measured Core Web Vitals run was performed.
- CMS-backed success responses require configured read-only Supabase access and post-deployment checks. No database records, credentials, master branch or hosting settings were modified.

Framework behavior checked against installed Next.js documentation and official references: https://nextjs.org/docs/app/api-reference/functions/not-found and https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap . Streaming can retain HTTP 200 for late notFound responses; noindex is required independently of status, and local production responses are checked with a crawler user agent.
