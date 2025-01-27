import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  rating: number;
  format: 'book' | 'audiobook';
  url: string;
  price: string;
}

interface AmazonBooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchBooks: () => Promise<void>;
  clearCache: () => void;
}

// Cache duration in milliseconds (30 minutes)
const CACHE_DURATION = 30 * 60 * 1000;

export const useAmazonBooks = create<AmazonBooksState>()(
  persist(
    (set, get) => ({
      books: [],
      loading: false,
      error: null,
      lastFetched: null,

      fetchBooks: async () => {
        const { lastFetched } = get();
        const now = Date.now();

        // Check if cache is still valid
        if (lastFetched && now - lastFetched < CACHE_DURATION) {
          return;
        }

        set({ loading: true, error: null });

        try {
          const response = await fetch('/api/amazon-books');
          if (!response.ok) throw new Error('Failed to fetch books');
          
          const data = await response.json();
          set({ 
            books: data, 
            loading: false, 
            lastFetched: now 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'An error occurred', 
            loading: false 
          });
        }
      },

      clearCache: () => {
        set({ lastFetched: null, books: [] });
      },
    }),
    {
      name: 'amazon-books-storage',
      partialize: (state) => ({ 
        books: state.books,
        lastFetched: state.lastFetched 
      }),
    }
  )
);