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
