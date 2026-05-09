# Amine Protocol — Migration Design

**Date:** 2026-05-09
**Status:** Approved design, awaiting user review before plan writing.

## Goal

Keep the new landing-page UI in `src/` as the visual source of truth, and bring back the full e-commerce functionality currently parked in `src.backup/` (storefront, cart, checkout, content pages, full admin dashboard). Every ported screen is re-skinned to the new design system before being considered done.

## Constraints & Decisions

- **Scope:** full migration — storefront + content pages + `/admin` (Q1-C).
- **Design fidelity:** strict re-skin everywhere, including admin (Q2-A).
- **Supabase:** fresh project; user wires schema/data later via MCP. Code must degrade gracefully when env vars are absent (Q3-C, Q8 deferred).
- **Routing:** keep all backup routes (`/`, `/faq`, `/coa`, `/calculator`, `/track-order`, `/protocols`, `/admin`); no auth gate on `/admin` (Q4-B).
- **Ancillary:** keep PostHog analytics, AI helpers, email templates, all existing tests (Q5-A).

## Existing Stack (new `src/`)

React 19, Vite 7, Tailwind 3, react-router 7, shadcn/ui (full set in `src/components/ui/`), GSAP, Lenis, Sonner, react-hook-form + zod.

**Design tokens** (from `tailwind.config.js`):
- `primary` `#0F1A2E` (navy), `primary.dark` `#060B17`, `primary.light` `#1F2D48`
- `secondary` `#C9A961` (gold), `secondary.dark` `#A8893F`, `secondary.light` `#E0C685`
- `accent` `#F5E9C8` (cream), `accent.light` `#FAF3DD`
- Inter font; `shadow-card` / `shadow-card-hover`; `rounded-2xl` / `rounded-3xl`

## Approach

**Wholesale port, then re-skin in place.** Promote `src.backup/` content into `src/` directories alongside the new landing, rewire routing, then re-skin each ported component to use shadcn primitives and design tokens. Lowest risk of losing logic; intermediate states render but look unstyled until each component's re-skin lands.

## Directory Layout

```
src/
  App.tsx                    # router root, Suspense, PostHog tracker, CartProvider
  main.tsx
  index.css                  # keep current
  App.css                    # keep

  sections/                  # new landing sections (UNCHANGED)
    HeroSection.tsx, AboutSection.tsx, FAQSection.tsx,
    GuaranteeSection.tsx, QualitySection.tsx, WhyChooseSection.tsx,
    ProductGrid.tsx, SucceedSection.tsx, ProductionSection.tsx,
    ProcessSection.tsx, AnnouncementBar.tsx, Header.tsx, Footer.tsx

  pages/                     # one file per route
    Home.tsx, FAQ.tsx, COA.tsx, Calculator.tsx,
    OrderTracking.tsx, ProtocolGuide.tsx, Admin.tsx

  components/
    ui/                      # shadcn primitives (UNCHANGED)
    storefront/              # Cart, Checkout, ProductDetailModal, MenuItemCard,
                             # FloatingCartButton, PromoBanner, PromoPopup,
                             # SubNav, MobileNav
    admin/                   # AdminDashboard + 15 managers
    common/                  # ScrollReveal, LoadingSpinner, ImageUpload, ArticleDetail

  hooks/                     # ported from src.backup/hooks/
  lib/                       # supabase.ts, posthog.ts, ai.ts, protocolTemplates.ts,
                             # cart-context.tsx + existing siteContent.ts, utils.ts
  data/menuData.ts
  types/index.ts
  test/setup.ts              # vitest setup; *.test.tsx live next to components

src.backup/                  # deleted in Phase 6
```

The new `src/sections/Header.tsx` and `Footer.tsx` are the design source of truth and replace backup's versions; cart count + click handlers are added as props.

## Routing

`react-router@7` (already installed). Backup imports of `react-router-dom` rewritten to `react-router` (same API surface for the hooks/components used).

```tsx
<BrowserRouter>
  <PostHogPageviewTracker />
  <CartProvider>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/coa" element={<COA />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/track-order" element={<OrderTracking />} />
        <Route path="/protocols" element={<ProtocolGuide />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Suspense>
  </CartProvider>
</BrowserRouter>
```

## Home Composition

```tsx
// src/pages/Home.tsx
<>
  <AnnouncementBar />
  <PromoBanner />
  <PromoPopup />
  <Header cartCount={...} onCartClick={...} />
  <main>
    <HeroSection />
    <GuaranteeSection />
    <QualitySection />
    <WhyChooseSection />
    <ProductGrid />          {/* re-skinned, wired to useMenu — replaces backup Menu */}
    <SucceedSection />
    <ProductionSection />
    <ProcessSection />
    <AboutSection />
    <FAQSection />
  </main>
  <Footer />
  <FloatingCartButton />
  <CartDrawer />              {/* shadcn Drawer, replaces full-page cart view */}
  <CheckoutDialog />          {/* shadcn Dialog, replaces full-page checkout view */}
  <ProductDetailModal />      {/* shadcn Dialog */}
</>
```

**UX shift from backup:** backup used view-state (`'menu' | 'cart' | 'checkout'`) to swap full pages. New design uses shadcn `Drawer` for Cart and `Dialog` for Checkout — keeps user on landing, matches design system. Other routes still render as full pages and are lazy-loaded.

## Cart State

Lift `useCart()` once via React context (`src/lib/cart-context.tsx`). `<CartProvider>` wraps `<Routes>`. `Header` badge, `FloatingCartButton`, `CartDrawer`, `CheckoutDialog`, `ProductGrid` all consume `useCartContext()`. Replaces prop-drilling from backup's `App.tsx`.

## Dependencies

**Add to `package.json`:**

```
@supabase/supabase-js
posthog-js
vitest
@testing-library/react
@testing-library/jest-dom
@testing-library/user-event
jsdom
```

`posthog-js/react` ships with `posthog-js`. Add scripts: `"test": "vitest"`, `"test:ui": "vitest --ui"`.

## Environment Variables

`.env.local` (gitignored), with `.env.local.example` committed:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=
```

`lib/supabase.ts` and `lib/posthog.ts` must no-op gracefully when their env vars are missing — hooks return empty arrays, `posthog.capture` is a noop. The site must build and the landing must render without any of these set.

## Hooks (ported wholesale)

`useCart`, `useMenu`, `useCategories`, `useFAQs`, `useProtocols`, `useCouriers`, `useShippingLocations`, `usePaymentMethods`, `useSiteSettings`, `useImageUpload`, `useCOAPageSetting`. All consume `lib/supabase.ts`.

## Re-Skin Mapping (applies to every ported component)

| Backup pattern | New equivalent |
|---|---|
| `<button className="bg-blue-...">` | `<Button>` from `ui/button` |
| Custom modal/overlay | `Dialog` / `Sheet` / `Drawer` |
| Hand-rolled accordion | `Accordion` |
| Custom dropdown / select | `Select`, `DropdownMenu` |
| Custom tabs | `Tabs` |
| Toast / alert calls | `sonner` (`toast(...)`) |
| Form inputs | `Input`, `Textarea`, `Label`, `Field`, `Form` (RHF + zod) |
| Tables | `Table` primitives |
| Loading | `Spinner` / `Skeleton` |
| Cards | `Card` + `shadow-card` |
| Hard-coded colors | tokens (`bg-primary`, `text-secondary`, etc.) |

## Component Inventory

**Storefront (12):** Header (extended), Footer, AnnouncementBar, PromoBanner, PromoPopup, SubNav, ProductGrid (replaces `Menu`), MenuItemCard, ProductDetailModal, CartDrawer (replaces `Cart`), CheckoutDialog (replaces `Checkout`), FloatingCartButton, MobileNav.

**Content pages (5):** FAQ, COA, Calculator (peptide), OrderTracking, ProtocolGuide (with embedded SmartGuide, ArticleDetail).

**Admin (16):** AdminDashboard shell (shadcn Sidebar + Tabs), OrdersManager, ProductsManager (consolidates admin views of MenuItemCard), CategoryManager, VariationManager, FAQManager, COAManager, CourierManager, ShippingManager, PaymentMethodManager, PromoCodeManager, ProtocolManager, GuideManager, PeptideInventoryManager, SiteSettingsManager, ImageUpload (shared).

## Per-Component Verification Checklist

1. No `react-router-dom` imports.
2. No raw hex / arbitrary tailwind colors — only design tokens.
3. No raw `<button>` / `<input>` — uses shadcn primitives.
4. Renders without console errors when Supabase env is empty.
5. Existing test (if any) still passes.
6. Lazy-loaded routes have `Suspense` fallback.

## Acceptance Criteria

- Every route navigates without error.
- Cart drawer + checkout dialog complete an order end-to-end against Supabase.
- Every admin manager's CRUD flow works.
- All backup tests pass under vitest.
- `src.backup/` deleted; root debug `*.md`/`*.sql`/`*.html` files moved to `docs/` or removed.
- `npm run build` and `npm run lint` clean.

## Phased Migration

Each phase is a commit boundary. The site is buildable at every checkpoint.

**Phase 0 — Foundations**
- Add deps; add `.env.local.example`; create `src/lib/supabase.ts`, `src/lib/posthog.ts`.
- Add `vitest.config.ts` + `src/test/setup.ts`.
- Convert `App.tsx` to router; create empty page stubs. `Home.tsx` keeps current landing untouched.
- ✅ Build passes; landing renders unchanged.

**Phase 1 — Data layer**
- Port `src/types/`, `src/data/`, `src/hooks/`, remaining `src/lib/` files (`ai.ts`, `protocolTemplates.ts`).
- Rewrite all `react-router-dom` → `react-router`.
- Add `src/lib/cart-context.tsx`; wrap `<Routes>` in `<CartProvider>`.
- ✅ Hooks importable; nothing new rendered.

**Phase 2 — Storefront on Home**
- Re-skin & wire: `ProductGrid` (`useMenu`), `MenuItemCard`, `ProductDetailModal`, `CartDrawer`, `CheckoutDialog`, `FloatingCartButton`, `AnnouncementBar`, `PromoBanner`, `PromoPopup`, `SubNav`, `MobileNav`. Add cart count to existing `Header`.
- ✅ Browse → cart → checkout works end-to-end.

**Phase 3 — Content routes**
- Re-skin & wire `FAQ`, `Calculator`, `OrderTracking`, `ProtocolGuide` (+ `SmartGuide`, `ArticleDetail`), `COA`. Lazy-load each.
- ✅ All public routes done.

**Phase 4 — Admin shell + high-value managers**
- Build `AdminDashboard` shell (shadcn `Sidebar` + `Tabs`).
- Re-skin: `OrdersManager`, `ProductsManager`, `CategoryManager`, `VariationManager`, `SiteSettingsManager`, `ImageUpload`.
- ✅ Core admin operational.

**Phase 5 — Remaining managers**
- `FAQManager`, `COAManager`, `CourierManager`, `ShippingManager`, `PaymentMethodManager`, `PromoCodeManager`, `ProtocolManager`, `GuideManager`, `PeptideInventoryManager`.
- ✅ Full admin parity.

**Phase 6 — Cleanup**
- Port tests; vitest green.
- Delete `src.backup/`, `public.backup/`, loose root debug files (move worthwhile docs to `docs/`).
- `npm run build` + `npm run lint` clean.
- ✅ Migration complete.

## Out of Scope

- Supabase schema/seed migration (user handles via MCP).
- New features or behavior changes beyond what backup already implements.
- Auth gating for `/admin` (explicitly declined).
- Re-architecting the admin permissions model.
