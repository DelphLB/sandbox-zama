import React, { createContext, useContext, useEffect, useState } from 'react';

type FeatureFlags = {
  compactMode: boolean;
  toggleCompact: () => void;
};

const KEY = 'sandbox_feature_flags';

const FeatureFlagContext = createContext<FeatureFlags | null>(null);

export function FeatureFlagProvider({ children }: { children: React.ReactNode }) {
  const [compactMode, setCompactMode] = useState(() => {
    try {
      const stored = localStorage.getItem(KEY);
      return stored ? JSON.parse(stored).compactMode : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ compactMode }));
    document.body.dataset.compact = String(compactMode);
  }, [compactMode]);

  const toggleCompact = () => setCompactMode((prev: boolean) => !prev);

  return (
    <FeatureFlagContext.Provider value={{ compactMode, toggleCompact }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlags() {
  const ctx = useContext(FeatureFlagContext);
  if (!ctx) throw new Error('useFeatureFlags must be used within FeatureFlagProvider');
  return ctx;
}
