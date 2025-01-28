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

// Mock data for when Amazon API is not available
const mockBooks: Book[] = [
  {
    id: 'mock-1',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80',
    rating: 4.7,
    format: 'book',
    url: 'https://www.amazon.com/Power-Now-Guide-Spiritual-Enlightenment/dp/1577314808',
    price: '$14.99'
  },
  {
    id: 'mock-2',
    title: 'Atomic Habits',
    author: 'James Clear',
    imageUrl: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    format: 'audiobook',
    url: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299',
    price: '$18.99'
  },
  {
    id: 'mock-3',
    title: 'Think Like a Monk',
    author: 'Jay Shetty',
    imageUrl: 'https://images.unsplash.com/photo-1602934585418-f588bea4215c?auto=format&fit=crop&w=300&q=80',
    rating: 4.6,
    format: 'book',
    url: 'https://www.amazon.com/Think-Like-Monk-Train-Purpose/dp/1982134488',
    price: '$16.99'
  },
  {
    id: 'mock-4',
    title: 'The Happiness of Pursuit',
    author: 'Chris Guillebeau',
    imageUrl: 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?auto=format&fit=crop&w=300&q=80',
    rating: 4.5,
    format: 'audiobook',
    url: 'https://www.amazon.com/Happiness-Pursuit-Finding-Quest-Change/dp/0385348843',
    price: '$15.99'
  },
  {
    id: 'mock-5',
    title: 'Mindfulness for Beginners',
    author: 'Jon Kabat-Zinn',
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=300&q=80',
    rating: 4.6,
    format: 'book',
    url: 'https://www.amazon.com/Mindfulness-Beginners-Reclaiming-Present-Moment/dp/1622036674',
    price: '$13.99'
  },
  {
    id: 'mock-6',
    title: 'The Mind Illuminated',
    author: 'Culadasa',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    format: 'audiobook',
    url: 'https://www.amazon.com/Mind-Illuminated-Meditation-Integrating-Mindfulness/dp/1501156985',
    price: '$19.99'
  }
];

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
          console.log('Using mock data due to API error');
          set({ 
            books: mockBooks,
            error: error instanceof Error ? error.message : 'An error occurred', 
            loading: false,
            lastFetched: now
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