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
