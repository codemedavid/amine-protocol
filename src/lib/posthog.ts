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
