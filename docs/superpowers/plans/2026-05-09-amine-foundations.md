# Amine Foundations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lay the foundations for porting `src.backup/` features into `src/`: install deps, set up Supabase + PostHog clients (graceful when env vars missing), add a router with page stubs, port the data/types/hooks layer, and add a global cart context. End state: build and lint pass, vitest runs, the landing page renders unchanged at `/`, all hooks importable, no UI behavior change yet.

**Architecture:** Promote backup non-component layers (types, data, lib, hooks) into `src/` alongside the new landing. Keep `src/sections/` and `src/components/ui/` untouched. Wrap `<Routes>` in a `CartProvider` so future storefront work can pull cart state from any tree depth. Supabase and PostHog modules degrade gracefully — landing must build/render even if `.env.local` is empty. Component ports (which use `react-router-dom`) and their import rewrites land in later plans.

**Tech Stack:** React 19, Vite 7, TypeScript, Tailwind 3, react-router 7, shadcn/ui, `@supabase/supabase-js`, `posthog-js`, vitest + @testing-library.

**Spec:** `docs/superpowers/specs/2026-05-09-amine-migration-design.md` (Phases 0–1).

---

## File Structure

**Created:**
- `.env.local.example`
- `vitest.config.ts`
- `src/test/setup.ts`
- `src/lib/supabase.ts` — Supabase singleton; `null` when env missing
- `src/lib/posthog.ts` — init helper; no-op when key missing
- `src/lib/ai.ts` — ported as-is from backup
- `src/lib/protocolTemplates.ts` — ported as-is from backup
- `src/lib/cart-context.tsx` — `CartProvider`, `useCartContext`
- `src/types/index.ts` — ported from backup
- `src/data/menuData.ts` — ported from backup
- `src/hooks/*.ts` — every hook from backup
- `src/hooks/*.test.ts` — every hook test from backup
- `src/pages/Home.tsx` — moves the current landing composition out of `App.tsx`
- `src/pages/FAQ.tsx`, `COA.tsx`, `Calculator.tsx`, `OrderTracking.tsx`, `ProtocolGuide.tsx`, `Admin.tsx` — stubs returning a placeholder for now
- `src/components/common/LoadingSpinner.tsx` — small fallback for `<Suspense>`

**Modified:**
- `package.json` — add deps + scripts
- `.gitignore` — ensure `.env.local` ignored
- `src/main.tsx` — wrap App in `PostHogProvider`, call `initPostHog()`
- `src/App.tsx` — replaced with `<Routes>` + `<CartProvider>` + `<Suspense>`

**Untouched:**
- `src/sections/*` — design source of truth
- `src/components/ui/*` — shadcn primitives
- `src/components/ScrollReveal.tsx`
- `src/lib/siteContent.ts`, `src/lib/utils.ts`
- `src/index.css`, `src/App.css`
- `src.backup/*` — deleted later in Phase 6

---

## Task 1: Install dependencies and add test scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime deps**

```bash
npm install @supabase/supabase-js posthog-js
```

Expected: deps added, no peer warnings beyond pre-existing.

- [ ] **Step 2: Install dev deps for testing**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 3: Add test scripts**

In `package.json`, under `"scripts"`, add `"test": "vitest"` and `"test:ui": "vitest --ui"`. Final scripts block:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest",
  "test:ui": "vitest --ui"
}
```

- [ ] **Step 4: Verify build still passes**

Run: `npm run build`
Expected: build completes cleanly (no errors related to new deps).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add supabase, posthog, vitest deps"
```

---

## Task 2: Add `.env.local.example` and ensure `.env.local` is gitignored

**Files:**
- Create: `.env.local.example`
- Modify: `.gitignore` (only if `.env.local` not already covered)

- [ ] **Step 1: Create the example file**

Write `.env.local.example`:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

- [ ] **Step 2: Check `.gitignore`**

Run: `grep -n "\.env" .gitignore || echo "MISSING"`
Expected: see `.env` or `.env.local` patterns. If `MISSING`, add this block to `.gitignore`:

```
.env
.env.local
.env.*.local
```

- [ ] **Step 3: Commit**

```bash
git add .env.local.example .gitignore
git commit -m "chore: env.local.example for supabase + posthog"
```

---

## Task 3: Create graceful Supabase client at `src/lib/supabase.ts`

**Files:**
- Create: `src/lib/supabase.ts`
- Test: `src/lib/supabase.test.ts`

The backup version throws when env vars are missing. We need it to no-op so the landing builds and renders without `.env.local`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/supabase.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { supabase } from './supabase';

describe('supabase client', () => {
  it('exports either a client or null', () => {
    expect(supabase === null || typeof supabase === 'object').toBe(true);
  });

  it('is null when env vars are missing', () => {
    // In test env neither VITE_SUPABASE_URL nor VITE_SUPABASE_ANON_KEY is set
    expect(supabase).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/lib/supabase.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/supabase.ts`**

```ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;

if (!supabase && import.meta.env.DEV) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing — client is null. ' +
    'Hooks that depend on it will return empty data.'
  );
}

// Database type re-export — kept inline to mirror backup so hooks compile unchanged.
export type Database = {
  public: {
    Tables: Record<string, { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }>;
  };
};
```

Note: `Database` is intentionally loose here. Hooks ported from backup typically use `supabase.from('...').select()` without a generic, so this won't break compilation. If a hook that uses the generic form lands later, port the full backup `Database` type at that point.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/lib/supabase.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/supabase.ts src/lib/supabase.test.ts
git commit -m "feat(lib): graceful supabase client (null when env missing)"
```

---

## Task 4: Create graceful PostHog init at `src/lib/posthog.ts`

**Files:**
- Create: `src/lib/posthog.ts`

- [ ] **Step 1: Implement**

```ts
import posthog from 'posthog-js';

export function initPostHog(): void {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  if (!key) {
    if (import.meta.env.DEV) {
      console.warn('[posthog] VITE_POSTHOG_KEY missing — analytics disabled.');
    }
    return;
  }
  posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST ?? '/ingest',
    ui_host: 'https://us.posthog.com',
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    debug: import.meta.env.DEV,
  });
}

export default posthog;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc -b --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/lib/posthog.ts
git commit -m "feat(lib): graceful posthog init"
```

---

## Task 5: Wire PostHogProvider in `src/main.tsx`

**Files:**
- Modify: `src/main.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { PostHogProvider } from 'posthog-js/react';
import posthog, { initPostHog } from './lib/posthog';
import './index.css';
import App from './App.tsx';

initPostHog();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostHogProvider>
  </StrictMode>,
);
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/main.tsx
git commit -m "feat: mount PostHogProvider"
```

---

## Task 6: Vitest config + setup

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Write `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 2: Write `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
```

- [ ] **Step 3: Add vitest types to `tsconfig.app.json`**

Open `tsconfig.app.json` and ensure `"types"` includes `"vitest/globals"` and `"@testing-library/jest-dom"`. If a `compilerOptions.types` array does not exist, add:

```json
"types": ["vitest/globals", "@testing-library/jest-dom"]
```

- [ ] **Step 4: Run an empty vitest pass**

Run: `npx vitest run`
Expected: passes (only the `supabase.test.ts` from Task 3 runs).

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts src/test/setup.ts tsconfig.app.json
git commit -m "test: vitest + jsdom + RTL setup"
```

---

## Task 7: Add `LoadingSpinner` for Suspense fallback

**Files:**
- Create: `src/components/common/LoadingSpinner.tsx`

- [ ] **Step 1: Implement using shadcn Spinner**

```tsx
import { Spinner } from '@/components/ui/spinner';

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner className="text-secondary" />
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/LoadingSpinner.tsx
git commit -m "feat(common): LoadingSpinner suspense fallback"
```

---

## Task 8: Move landing composition into `src/pages/Home.tsx`

**Files:**
- Create: `src/pages/Home.tsx`
- Modify: `src/App.tsx` (full rewrite in Task 9)

- [ ] **Step 1: Create `src/pages/Home.tsx`** with the existing landing composition copied verbatim from `src/App.tsx`:

```tsx
import AnnouncementBar from '../sections/AnnouncementBar';
import Header from '../sections/Header';
import HeroSection from '../sections/HeroSection';
import GuaranteeSection from '../sections/GuaranteeSection';
import QualitySection from '../sections/QualitySection';
import WhyChooseSection from '../sections/WhyChooseSection';
import ProductGrid from '../sections/ProductGrid';
import SucceedSection from '../sections/SucceedSection';
import ProductionSection from '../sections/ProductionSection';
import ProcessSection from '../sections/ProcessSection';
import AboutSection from '../sections/AboutSection';
import FAQSection from '../sections/FAQSection';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <GuaranteeSection />
        <QualitySection />
        <WhyChooseSection />
        <ProductGrid />
        <SucceedSection />
        <ProductionSection />
        <ProcessSection />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Commit (App.tsx still untouched)**

```bash
git add src/pages/Home.tsx
git commit -m "feat(pages): extract Home from App"
```

---

## Task 9: Replace `App.tsx` with router and stub pages

**Files:**
- Modify: `src/App.tsx`
- Create: `src/pages/FAQ.tsx`, `src/pages/COA.tsx`, `src/pages/Calculator.tsx`, `src/pages/OrderTracking.tsx`, `src/pages/ProtocolGuide.tsx`, `src/pages/Admin.tsx`

- [ ] **Step 1: Create page stubs**

Each stub renders a minimal placeholder. Example for `src/pages/FAQ.tsx`:

```tsx
export default function FAQ() {
  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-primary">FAQ</h1>
      <p className="text-muted-foreground">Coming soon — re-skinned FAQ page.</p>
    </main>
  );
}
```

Create the same shape for `COA.tsx`, `Calculator.tsx`, `OrderTracking.tsx`, `ProtocolGuide.tsx`, `Admin.tsx` — change the heading text in each.

- [ ] **Step 2: Replace `src/App.tsx`**

```tsx
import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { usePostHog } from 'posthog-js/react';
import LoadingSpinner from './components/common/LoadingSpinner';
import Home from './pages/Home';

const FAQ = lazy(() => import('./pages/FAQ'));
const COA = lazy(() => import('./pages/COA'));
const Calculator = lazy(() => import('./pages/Calculator'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const ProtocolGuide = lazy(() => import('./pages/ProtocolGuide'));
const Admin = lazy(() => import('./pages/Admin'));

function PostHogPageviewTracker() {
  const location = useLocation();
  const posthog = usePostHog();
  useEffect(() => {
    if (!posthog) return;
    posthog.capture('$pageview', { $current_url: window.location.href });
  }, [location, posthog]);
  return null;
}

export default function App() {
  return (
    <>
      <PostHogPageviewTracker />
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
    </>
  );
}
```

- [ ] **Step 3: Verify dev server**

Run: `npm run dev` (then Ctrl-C). Open `http://localhost:5173/` and `http://localhost:5173/faq` in a browser.
Expected: landing renders at `/`, "FAQ — Coming soon…" renders at `/faq`. No console errors.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/pages/FAQ.tsx src/pages/COA.tsx src/pages/Calculator.tsx src/pages/OrderTracking.tsx src/pages/ProtocolGuide.tsx src/pages/Admin.tsx
git commit -m "feat: router + lazy page stubs"
```

---

## Task 10: Port types

**Files:**
- Create: `src/types/index.ts` (copy of `src.backup/types/index.ts`)

- [ ] **Step 1: Copy file**

Run: `cp src.backup/types/index.ts src/types/index.ts`

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc -b --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat(types): port from backup"
```

---

## Task 11: Port `data/menuData.ts`

**Files:**
- Create: `src/data/menuData.ts`

- [ ] **Step 1: Copy file**

Run: `cp src.backup/data/menuData.ts src/data/menuData.ts`

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc -b --noEmit`
Expected: PASS. (Imports of `../types` resolve because `src/types/index.ts` exists from Task 10.)

- [ ] **Step 3: Commit**

```bash
git add src/data/menuData.ts
git commit -m "feat(data): port menuData fallback"
```

---

## Task 12: Port `lib/ai.ts` and `lib/protocolTemplates.ts`

**Files:**
- Create: `src/lib/ai.ts`
- Create: `src/lib/protocolTemplates.ts`

- [ ] **Step 1: Copy files**

```bash
cp src.backup/lib/ai.ts src/lib/ai.ts
cp src.backup/lib/protocolTemplates.ts src/lib/protocolTemplates.ts
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc -b --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/lib/ai.ts src/lib/protocolTemplates.ts
git commit -m "feat(lib): port ai + protocolTemplates"
```

---

## Task 13: Port `useCart` hook with its test

The backup `useCart` does not depend on Supabase — pure localStorage + React state. Easiest hook to port and verifies the test setup.

**Files:**
- Create: `src/hooks/useCart.ts`
- Create: `src/hooks/useCart.test.ts`

- [ ] **Step 1: Copy files verbatim**

```bash
cp src.backup/hooks/useCart.ts src/hooks/useCart.ts
cp src.backup/hooks/useCart.test.ts src/hooks/useCart.test.ts
```

- [ ] **Step 2: Run the test**

Run: `npx vitest run src/hooks/useCart.test.ts`
Expected: PASS (all 453 lines of test coverage green). If imports fail, check that the test imports `from '../types'` — the path should resolve since `src/types/index.ts` was ported in Task 10.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useCart.ts src/hooks/useCart.test.ts
git commit -m "feat(hooks): port useCart with tests"
```

---

## Task 14: Port `useMenu` and `useCategories` hooks with their tests

These hooks talk to Supabase. Their tests stub the client, so they don't need a live backend.

**Files:**
- Create: `src/hooks/useMenu.ts`, `src/hooks/useMenu.test.ts`
- Create: `src/hooks/useCategories.ts`, `src/hooks/useCategories.test.ts`

- [ ] **Step 1: Copy files**

```bash
cp src.backup/hooks/useMenu.ts src/hooks/useMenu.ts
cp src.backup/hooks/useMenu.test.ts src/hooks/useMenu.test.ts
cp src.backup/hooks/useCategories.ts src/hooks/useCategories.ts
cp src.backup/hooks/useCategories.test.ts src/hooks/useCategories.test.ts
```

- [ ] **Step 2: Patch ported hooks for nullable Supabase**

Both hooks import `supabase` from `../lib/supabase`. Backup assumed it was non-null. Now it can be `null`. For each of `useMenu.ts` and `useCategories.ts`, add a guard at the top of every async data function. Example pattern — wherever the hook calls `await supabase.from('products')...` or similar, prepend:

```ts
if (!supabase) {
  setLoading(false);
  return;
}
```

Inside any function that returns data (e.g. `fetchMenuItems`, `fetchCategories`), make the early return set the empty state and exit. For realtime subscriptions, also guard:

```ts
if (!supabase) return;
const channel = supabase.channel('...')...
```

Walk each function in the file and apply the guard. Use the TypeScript compiler as a checklist:

Run: `npx tsc -b --noEmit`
Expected: errors point to every line that calls a method on possibly-null `supabase`. Add a guard at each. Repeat until PASS.

- [ ] **Step 3: Run the tests**

Run: `npx vitest run src/hooks/useMenu.test.ts src/hooks/useCategories.test.ts`
Expected: PASS. If a test now expects the hook to short-circuit when supabase is null, that's a behavior change — re-read the test, and only adjust the test if the change is intentional. Otherwise the test should already mock `supabase` as non-null.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useMenu.ts src/hooks/useMenu.test.ts src/hooks/useCategories.ts src/hooks/useCategories.test.ts
git commit -m "feat(hooks): port useMenu + useCategories with tests"
```

---

## Task 15: Port remaining hooks (no separate tests)

These hooks have no `*.test.ts` companions in backup.

**Files:**
- Create:
  - `src/hooks/useFAQs.ts`
  - `src/hooks/useProtocols.ts` + `src/hooks/useProtocols.test.ts`
  - `src/hooks/useCouriers.ts`
  - `src/hooks/useShippingLocations.ts`
  - `src/hooks/usePaymentMethods.ts`
  - `src/hooks/useSiteSettings.ts`
  - `src/hooks/useImageUpload.ts`
  - `src/hooks/useCOAPageSetting.ts`

- [ ] **Step 1: Copy all files**

```bash
cp src.backup/hooks/useFAQs.ts src/hooks/
cp src.backup/hooks/useProtocols.ts src/hooks/
cp src.backup/hooks/useProtocols.test.ts src/hooks/
cp src.backup/hooks/useCouriers.ts src/hooks/
cp src.backup/hooks/useShippingLocations.ts src/hooks/
cp src.backup/hooks/usePaymentMethods.ts src/hooks/
cp src.backup/hooks/useSiteSettings.ts src/hooks/
cp src.backup/hooks/useImageUpload.ts src/hooks/
cp src.backup/hooks/useCOAPageSetting.ts src/hooks/
```

- [ ] **Step 2: Apply nullable-supabase guards**

Same pattern as Task 14 Step 2. Run:

Run: `npx tsc -b --noEmit`
Expected: list of TS2531 / TS18047 errors ("Object is possibly 'null'"). Add a guard at each. Repeat until PASS.

- [ ] **Step 3: Run the test suite**

Run: `npx vitest run`
Expected: every ported test passes (`useCart`, `useMenu`, `useCategories`, `useProtocols`, plus `supabase`).

- [ ] **Step 4: Commit**

```bash
git add src/hooks/
git commit -m "feat(hooks): port remaining hooks with nullable-supabase guards"
```

---

## Task 16: Cart context

**Files:**
- Create: `src/lib/cart-context.tsx`
- Create: `src/lib/cart-context.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCartContext } from './cart-context';
import type { Product } from '../types';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const product: Product = {
  id: 'p1',
  name: 'Test',
  description: '',
  category: 'misc',
  base_price: 10,
  discount_price: null,
  discount_active: false,
  purity_percentage: 99,
  molecular_weight: null,
  cas_number: null,
  sequence: null,
  storage_conditions: '',
  inclusions: null,
  stock_quantity: 5,
  available: true,
  featured: false,
  image_url: null,
  safety_sheet_url: null,
  created_at: '',
  updated_at: '',
} as unknown as Product;

describe('CartProvider', () => {
  it('exposes cart state to consumers', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    expect(result.current.getTotalItems()).toBe(0);
    act(() => result.current.addToCart(product, undefined, 1));
    expect(result.current.getTotalItems()).toBe(1);
  });

  it('throws when used outside provider', () => {
    expect(() => renderHook(() => useCartContext())).toThrow(/CartProvider/);
  });
});
```

- [ ] **Step 2: Run to confirm it fails**

Run: `npx vitest run src/lib/cart-context.test.tsx`
Expected: FAIL — module missing.

- [ ] **Step 3: Implement `src/lib/cart-context.tsx`**

```tsx
import { createContext, useContext, type ReactNode } from 'react';
import { useCart } from '../hooks/useCart';

type CartValue = ReturnType<typeof useCart>;

const CartCtx = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();
  return <CartCtx.Provider value={cart}>{children}</CartCtx.Provider>;
}

export function useCartContext(): CartValue {
  const v = useContext(CartCtx);
  if (!v) throw new Error('useCartContext must be used inside <CartProvider>');
  return v;
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/lib/cart-context.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/cart-context.tsx src/lib/cart-context.test.tsx
git commit -m "feat(lib): CartProvider + useCartContext"
```

---

## Task 17: Wrap `<Routes>` in `<CartProvider>`

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Wrap `<Suspense>` in `<CartProvider>`**

Change `src/App.tsx` so the return value reads:

```tsx
return (
  <>
    <PostHogPageviewTracker />
    <CartProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* …routes unchanged… */}
        </Routes>
      </Suspense>
    </CartProvider>
  </>
);
```

Add the import at the top:

```tsx
import { CartProvider } from './lib/cart-context';
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Verify dev server**

Run: `npm run dev` (Ctrl-C after page loads). Open `/` and `/faq` in a browser.
Expected: landing renders unchanged; no console errors.

- [ ] **Step 4: Run full test suite**

Run: `npx vitest run`
Expected: all tests pass.

- [ ] **Step 5: Run lint**

Run: `npm run lint`
Expected: no new errors. (Pre-existing warnings in `src.backup/` are out of scope — `src.backup/` will be deleted in Phase 6. If lint scans `src.backup/`, add it to `eslint.config.js` ignores: `{ ignores: ['src.backup/**', 'public.backup/**', 'dist/**'] }`.)

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx eslint.config.js
git commit -m "feat: wrap Routes in CartProvider"
```

---

## Definition of Done

- `npm run build` clean.
- `npm run lint` clean (with `src.backup/` ignored).
- `npx vitest run` passes (≥4 hook test files + `supabase.test.ts` + `cart-context.test.tsx`).
- `/` renders the existing landing page with no behavior change.
- `/faq`, `/coa`, `/calculator`, `/track-order`, `/protocols`, `/admin` each render their stub.
- App tree is wrapped in `BrowserRouter` → `PostHogProvider` → `CartProvider` → `Suspense` → `Routes`.
- All hooks importable from `src/hooks/*`; `supabase` and `posthog` no-op when env missing.
- No `react-router-dom` imports remain in `src/`.

The next plan (`2026-05-09-amine-storefront.md`) re-skins and wires the storefront onto Home — `ProductGrid`, `MenuItemCard`, `ProductDetailModal`, `CartDrawer`, `CheckoutDialog`, and friends.
