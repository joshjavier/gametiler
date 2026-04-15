'use client';

import { useStore } from '@/lib/store';

export function Status() {
  const { status, games, mobileGames, error } = useStore();

  if (status === 'idle') return null;

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-1.25 text-[11px] text-(--color-text-tertiary)">
        <div className="size-1.5 shrink-0 animate-pulse rounded-full bg-(--color-border-secondary)" />
        Loading…
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center gap-1.25 text-[11px] text-[#c0392b]">
        <div className="size-1.5 shrink-0 rounded-full bg-[#c0392b]" />
        {error}
      </div>
    );
  }

  const total = games.length + mobileGames.length;
  return (
    <div className="flex items-center gap-1.25 text-[11px] text-(--color-text-tertiary)">
      <div className="size-1.5 shrink-0 rounded-full bg-[#1d9e75]" />
      {total.toLocaleString()} games
    </div>
  );
}
