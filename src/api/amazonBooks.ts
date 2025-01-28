import axios from 'axios';
import { rateLimit } from 'express-rate-limit';
import { createClient } from 'redis';
import { Book } from '../store/amazonBooks';

const redis = createClient({
  url: process.env.REDIS_URL
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
      accessKey: process.env.AMAZON_ACCESS_KEY!,
      secretKey: process.env.AMAZON_SECRET_KEY!,
      partnerTag: process.env.AMAZON_PARTNER_TAG!,
      region: process.env.AMAZON_REGION || 'us-east-1'
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
      throw new Error('Failed to fetch books from Amazon');
    }
  }

  private generateAuthHeader(): string {
    // Implement Amazon API authentication signature generation
    // This is a placeholder
    return '';
  }

  private transformApiResponse(data: any): Book[] {
    // Transform Amazon API response to our Book interface
    // This is a placeholder implementation
    return [];
  }
}

export const amazonBooksApi = new AmazonBooksAPI();