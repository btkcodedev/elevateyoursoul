import axios from 'axios';
import { rateLimit } from 'express-rate-limit';
import { createClient } from 'redis';
import { Book } from '../store/amazonBooks';

const redis = createClient({
  url: import.meta.env.VITE_REDIS_URL || 'redis://localhost:6379'
});

redis.on('error', (err) => console.error('Redis Client Error', err));

// Rate limiting middleware
export const amazonBooksLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

interface AmazonApiConfig {
  accessKey: string;
  secretKey: string;
  partnerTag: string;
  region: string;
}

class AmazonBooksAPI {
  private config: AmazonApiConfig;
  private cachePrefix = 'amazon_books:';
  private cacheDuration = 30 * 60; // 30 minutes in seconds

  constructor() {
    this.config = {
      accessKey: import.meta.env.VITE_AMAZON_ACCESS_KEY || 'mock-access-key',
      secretKey: import.meta.env.VITE_AMAZON_SECRET_KEY || 'mock-secret-key',
      partnerTag: import.meta.env.VITE_AMAZON_PARTNER_TAG || 'mock-partner-tag',
      region: import.meta.env.VITE_AMAZON_REGION || 'us-east-1'
    };
  }

  private async getCachedData(key: string): Promise<Book[] | null> {
    const cachedData = await redis.get(this.cachePrefix + key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  private async setCachedData(key: string, data: Book[]): Promise<void> {
    await redis.setEx(
      this.cachePrefix + key,
      this.cacheDuration,
      JSON.stringify(data)
    );
  }

  async searchBooks(keywords: string): Promise<Book[]> {
    const cacheKey = `search:${keywords}`;
    
    // Try to get from cache first
    const cachedBooks = await this.getCachedData(cacheKey);
    if (cachedBooks) {
      return cachedBooks;
    }

    try {
      // Implement actual Amazon Product Advertising API call here
      // This is a placeholder implementation
      const response = await axios.get('https://webservices.amazon.com/paapi5/searchitems', {
        params: {
          Keywords: keywords,
          SearchIndex: 'Books',
          Resources: [
            'ItemInfo.Title',
            'ItemInfo.ByLineInfo',
            'Images.Primary.Medium',
            'Offers.Listings.Price'
          ]
        },
        headers: {
          'Authorization': this.generateAuthHeader(),
          'Content-Type': 'application/json'
        }
      });

      const books = this.transformApiResponse(response.data);
      
      // Cache the results
      await this.setCachedData(cacheKey, books);
      
      return books;
    } catch (error) {
      console.error('Amazon API Error:', error);
      // Return mock data in case of error
      return [
        {
          id: 'mock-1',
          title: 'The Power of Now',
          author: 'Eckhart Tolle',
          imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80',
          rating: 4.5,
          format: 'book',
          url: '#',
          price: '$14.99'
        }
      ];
    }
  }

  private generateAuthHeader(): string {
    // Implement Amazon API authentication signature generation
    return 'mock-auth-header';
  }

  private transformApiResponse(data: any): Book[] {
    // Transform Amazon API response to our Book interface
    return [];
  }
}

export const amazonBooksApi = new AmazonBooksAPI();