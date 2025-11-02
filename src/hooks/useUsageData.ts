import { useMemo } from 'react';
import dataset from '../data/data.json';

export type Range = '7d' | '30d' | 'all';
export type UsageEntry = { date: string; requests: number; errors: number };

export function useUsageData(range: Range): UsageEntry[] {
  return useMemo(() => {
    const data = [...(dataset as UsageEntry[])].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    if (range === 'all') return data;

    const keep = range === '7d' ? 7 : 30;
    return data.slice(-keep);
  }, [range]);
}
