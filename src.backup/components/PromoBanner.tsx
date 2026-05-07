import React, { useState, useEffect } from 'react';
import { X, Gift, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import posthog from '../lib/posthog';

const DISMISSED_KEY = 'tbs_promo_banner_dismissed';

const PromoBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [dismissed, setDismissed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const wasDismissed = localStorage.getItem(DISMISSED_KEY);
    if (!wasDismissed) {
      setDismissed(false);
      posthog.capture('tbs_promo_banner_viewed');
    }
  }, []);

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [submitted]);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(DISMISSED_KEY, 'true');
    posthog.capture('tbs_promo_banner_dismissed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = email.trim();
    if (!trimmed) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setError('Please enter a valid email address');
      return;
    }

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase
        .from('promo_subscribers')
        .insert({ email: trimmed, source: 'tbs_promo_banner' });

      if (dbError) {
        if (dbError.code === '23505') {
          setSubmitted(true);
          posthog.capture('tbs_promo_banner_subscribed', { email: trimmed, already_subscribed: true });
        } else {
          setError('Something went wrong. Please try again.');
        }
      } else {
        setSubmitted(true);
        posthog.capture('tbs_promo_banner_subscribed', { email: trimmed });
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-brand-800 via-brand-700 to-brand-800 text-white z-40 overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
      {/* Gold accent lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="relative container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {submitted ? (
            <div className="flex items-center gap-2 text-sm font-medium animate-fadeIn">
              <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>You're in! We'll send you exclusive promos and updates.</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Gift className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span className="hidden sm:inline">Get exclusive promos & updates straight to your inbox!</span>
                <span className="sm:hidden">Get exclusive promos!</span>
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Enter your email"
                  className="px-3 py-1.5 rounded-lg text-sm text-white bg-white/10 border border-white/20 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 w-48 sm:w-56 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-1 px-4 py-1.5 bg-gold-500/90 hover:bg-gold-400 text-charcoal-900 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
                >
                  {submitting ? 'Joining...' : 'Join'}
                  {!submitting && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </form>

              {error && (
                <span className="text-xs text-red-300">{error}</span>
              )}
            </>
          )}

          <button
            onClick={handleDismiss}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
