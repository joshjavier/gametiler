'use client';

import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';

interface SearchBoxProps {
  query: string;
  onQueryChange: (value: string) => void;
}

const DEBOUNCE_MS = 200;

export function SearchBox({ query, onQueryChange }: SearchBoxProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onQueryChange(value), DEBOUNCE_MS);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="shrink-0 border-b-[0.5px] border-b-(--color-border-tertiary) p-2.5 pb-2">
      <div className="relative">
        <MagnifyingGlassIcon
          className="pointer-events-none absolute top-1/2 left-2.25 -translate-y-1/2 text-(--color-text-tertiary)"
          size={13}
        />
        <input
          className="w-full rounded-(--border-radius-md) border-[0.5px] border-(--color-border-secondary) bg-(--color-background-secondary) py-1.75 pr-2.25 pl-7.25 text-[12px] text-(--color-text-primary) placeholder:text-(--color-text-tertiary)"
          placeholder="Search by game name…"
          defaultValue={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
