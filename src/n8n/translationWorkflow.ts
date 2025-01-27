import axios from 'axios';

interface N8nConfig {
  baseUrl: string;
  apiKey: string;
}

interface TranslationResponse {
  data: {
    translatedText?: string;
    translatedTexts?: string[];
  };
}

export class TranslationService {
  private baseUrl: string;
  private apiKey: string;
  private workflowId: string;

  constructor(config: N8nConfig, workflowId: string) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.apiKey = config.apiKey;
    this.workflowId = workflowId;
  }

  private async executeWorkflow(data: any): Promise<TranslationResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/webhook/${this.workflowId}`,
        data,
        {
          headers: {
            'X-N8N-API-KEY': this.apiKey,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('N8n API error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

  async translateContent(text: string, targetLang: string): Promise<string> {
    try {
      const response = await this.executeWorkflow({
        text,
        targetLanguage: targetLang,
      });

      if (!response.data.translatedText) {
        throw new Error('Translation response is missing translated text');
      }

      return response.data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }

  async batchTranslate(texts: string[], targetLang: string): Promise<string[]> {
    try {
      const response = await this.executeWorkflow({
        texts,
        targetLanguage: targetLang,
      });

      if (!response.data.translatedTexts) {
        throw new Error('Translation response is missing translated texts array');
      }

      return response.data.translatedTexts;
    } catch (error) {
      console.error('Batch translation error:', error);
      throw error;
    }
  }
}