import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Mock Supabase URL and anon key for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Mock auth methods for development
if (!import.meta.env.VITE_SUPABASE_URL) {
  const mockUser = {
    id: 'mock-user-id',
    email: 'mock@example.com',
    user_metadata: {
      full_name: 'Mock User'
    }
  };

  // Override auth methods with mock implementations
  supabase.auth.getUser = async () => ({ data: { user: null }, error: null });
  supabase.auth.signInWithOAuth = async () => ({ data: { user: mockUser }, error: null });
  supabase.auth.signOut = async () => ({ error: null });
}