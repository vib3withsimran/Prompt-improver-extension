import { createClient } from '@supabase/supabase-js';

declare const chrome: any;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Custom storage provider for Supabase Auth to persist session in Chrome Extension Storage.
// Falls back to localStorage when previewed in web mode.
const chromeExtensionStorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.get([key], (result: any) => {
          resolve(result[key] || null);
        });
      });
    }
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, () => {
          resolve();
        });
      });
    }
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: async (key: string): Promise<void> => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.remove([key], () => {
          resolve();
        });
      });
    }
    localStorage.removeItem(key);
    return Promise.resolve();
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: chromeExtensionStorage,
    detectSessionInUrl: true,
    autoRefreshToken: true
  }
});

/**
 * Handles Google OAuth login flow using chrome.identity for extensions
 * Falls back to standard redirect login in local web browser preview mode.
 */
export async function signInWithGoogle(): Promise<void> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key is missing. Check your .env file.');
  }

  if (typeof chrome !== 'undefined' && chrome.identity && chrome.identity.launchWebAuthFlow) {
    const extensionId = chrome.runtime.id;
    const redirectUrl = `https://${extensionId}.chromiumapp.org/`;
    const authUrl = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectUrl)}`;

    return new Promise((resolve, reject) => {
      chrome.identity.launchWebAuthFlow(
        {
          url: authUrl,
          interactive: true
        },
        async (responseUrl?: string) => {
          if (chrome.runtime.lastError || !responseUrl) {
            reject(new Error(chrome.runtime.lastError?.message || 'Google Auth flow was cancelled.'));
            return;
          }

          try {
            // Parse access_token and refresh_token from the redirected hash url
            // URL Format: https://<id>.chromiumapp.org/#access_token=...&refresh_token=...
            const hash = new URL(responseUrl).hash;
            const params = new URLSearchParams(hash.substring(1));
            const access_token = params.get('access_token');
            const refresh_token = params.get('refresh_token');

            if (!access_token || !refresh_token) {
              reject(new Error('Auth tokens missing from redirection payload.'));
              return;
            }

            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token
            });

            if (error) {
              reject(error);
            } else {
              resolve();
            }
          } catch (err) {
            reject(err);
          }
        }
      );
    });
  } else {
    // Local web preview fallback: Standard sign-in redirect
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) throw error;
  }
}

/**
 * Log out of active Supabase session
 */
export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
