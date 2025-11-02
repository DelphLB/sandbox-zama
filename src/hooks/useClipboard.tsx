import { useState } from "react";

export function useClipboard(timeout = 1500) {
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setError(null);
      setTimeout(() => setCopied(null), timeout);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Unknown clipboard error";
      console.error("Clipboard copy failed:", message);
      setError(message);
    }
  }

  return { copied, error, copy };
}
