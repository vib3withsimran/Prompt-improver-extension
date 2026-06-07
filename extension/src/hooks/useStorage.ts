import { useState, useEffect } from 'react';

declare const chrome: any;

/**
 * Custom hook to manage persistent state in chrome.storage.local
 * Falls back to window.localStorage in non-extension environments (like local web testing)
 */
export function useStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    // Check if running in a chrome extension environment
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get([key], (result: any) => {
        if (result[key] !== undefined) {
          setStoredValue(result[key]);
        }
      });
    } else {
      const local = localStorage.getItem(key);
      if (local !== null) {
        try {
          setStoredValue(JSON.parse(local));
        } catch (e) {
          console.error('Failed to parse localStorage key:', key, e);
        }
      }
    }
  }, [key]);

  const setValue = (value: T) => {
    setStoredValue(value);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ [key]: value });
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  return [storedValue, setValue];
}
