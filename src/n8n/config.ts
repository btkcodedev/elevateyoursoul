export const N8N_CONFIG = {
  baseUrl: import.meta.env.VITE_N8N_API_URL || 'http://localhost:5678',
  apiKey: import.meta.env.VITE_N8N_API_KEY || '',
  translationWorkflowId: import.meta.env.VITE_N8N_TRANSLATION_WORKFLOW_ID || '',
};