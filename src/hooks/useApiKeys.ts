import { useEffect, useState } from 'react';

export type ApiKey = {
  id: string;
  label: string;
  value: string;
  createdAt: string;
  revealed?: boolean;
};

const STORAGE_KEY = 'sandbox_api_keys';

function base64url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function generateApiKey(prefix = 'sk_live_') {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return prefix + base64url(bytes);
}

export function useApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ApiKey[]) : [];
    } catch {
      return [];
    }
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  }, [keys]);

  function createKey() {
    const id = crypto.randomUUID();
    const label = `Key-${keys.length + 1}`;
    const value = generateApiKey();
    const createdAt = new Date().toISOString();
    setKeys((prev) => [...prev, { id, label, value, createdAt, revealed: true }]);
  }

  function revokeKey(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  }

  function regenerateKey(id: string) {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, value: generateApiKey(), revealed: true } : k))
    );
  }

  function toggleReveal(id: string) {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, revealed: !k.revealed } : k)));
  }

  async function copyKey(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(value);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch (e) {
    console.error('Clipboard copy failed', e);
    }
  }

  return { keys, copiedKey, createKey, revokeKey, regenerateKey, toggleReveal, copyKey };
}
