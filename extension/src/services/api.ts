/**
 * Client Service API wrapper to communicate with the Express/Workers backend
 */

export interface OptimizeRequest {
  prompt: string;
  model: string;
  apiKey?: string;
}

export interface OptimizeResponse {
  improvedPrompt: string;
  score: number;
  suggestions: string[];
}

const BACKEND_URL = 'https://api.prompt-improver.example.com'; // Placeholder, to be updated in subsequent phases

export const apiService = {
  /**
   * Sends a prompt optimization request to the backend proxy
   */
  async optimizePrompt(data: OptimizeRequest): Promise<OptimizeResponse> {
    // In later phases, this will hit our real Express / Cloudflare Workers backend.
    // For now, we return mock details locally.
    console.log('API Request sent to:', `${BACKEND_URL}/optimize`, data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          improvedPrompt: `[Optimized via ${data.model}]: ${data.prompt}`,
          score: 88,
          suggestions: [
            'Added strict constraints',
            'Added context specification',
            'Added desired output format structure'
          ]
        });
      }, 1000);
    });
  }
};
