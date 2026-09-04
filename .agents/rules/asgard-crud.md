# Asgard CMS CRUD Guidelines

Whenever creating, generating, or modifying any CRUD feature in the Asgard CMS:

1. **Dedicated Pages for Create & Edit**:
   - Always create dedicated full pages for creation and editing:
     - `/asgard/[module]/create` -> `app/(asgard)/asgard/[module]/create/page.tsx`
     - `/asgard/[module]/edit?id=...` -> `app/(asgard)/asgard/[module]/edit/page.tsx`
   - Use dedicated form containers (e.g. `containers/asgard/[Module]FormContainer.tsx`).
   - Do NOT use popup modals for Create and Edit workflows unless explicitly requested by the user.

2. **DataTable Page**:
   - The listing page `/asgard/[module]/page.tsx` must render the DataTable with server-side pagination, search, filters, status toggles, and delete confirmation modal.
   - The "New Item" button in the header and empty states must route directly to `/asgard/[module]/create`.
   - The "Edit" button in each table row must route directly to `/asgard/[module]/edit?id=[id]`.

3. **SEO & Metadata**:
   - Always register the page SEO keys in `configs/seo.ts` (`[module]`, `create[Module]`, `edit[Module]`).
