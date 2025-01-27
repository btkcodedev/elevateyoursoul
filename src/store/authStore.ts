import create from 'zustand';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type UserData = Database['public']['Tables']['user_data']['Row'];

interface AuthState {
  user: any | null;
  profile: Profile | null;
  userData: UserData | null;
  loading: boolean;
  initialized: boolean;
  signOut: () => Promise<void>;
  loadUserData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  userData: null,
  loading: true,
  initialized: false,

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null, userData: null });
  },

  loadUserData: async () => {
    try {
      set({ loading: true });
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Load profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // Load user data
        const { data: userData } = await supabase
          .from('user_data')
          .select('*')
          .eq('user_id', user.id)
          .single();

        set({ user, profile, userData });
      } else {
        set({ user: null, profile: null, userData: null });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      set({ loading: false, initialized: true });
    }
  },
}));

// Set up auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    useAuthStore.getState().loadUserData();
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({ user: null, profile: null, userData: null });
  }
});