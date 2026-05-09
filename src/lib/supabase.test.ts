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
