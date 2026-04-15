'use client';

import createFuzzySearch from '@nozbe/microfuzz';
import { PlusIcon } from '@phosphor-icons/react';
import { useMemo } from 'react';

import { useStore } from '@/lib/store';
import type { Game } from '@/types';

interface ResultsListProps {
  query: string;
}

export function ResultsList({ query }: ResultsListProps) {
  const { games, status } = useStore();

  const fuzzySearch = useMemo(() => createFuzzySearch(games, { key: 'name' }), [games]);

  const results: Game[] = useMemo(() => {
    if (!query.trim()) return games;
    return fuzzySearch(query).map((r) => r.item);
  }, [query, games, fuzzySearch]);

  if (status === 'idle') {
    return (
      <div className="flex flex-1 items-center justify-center text-[12px] text-(--color-text-tertiary)">
        Select a label to load games
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="flex flex-1 items-center justify-center text-[12px] text-(--color-text-tertiary)">
        Loading…
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-1 items-center justify-center text-[12px] text-(--color-text-tertiary)">
        Failed to load games
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-[12px] text-(--color-text-tertiary)">
        No results for "{query}"
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-1.5 py-1">
      {results.map((game) => (
        <GameRow key={game.id} game={game} query={query} />
      ))}
    </div>
  );
}

function GameRow({ game, query }: { game: Game; query: string }) {
  const { addGame, mobileGames, selectedGames } = useStore();
  const isSelected = selectedGames.some((g) => g.id === game.id);

  function handleAdd() {
    const mobileMatch = mobileGames.find((m) => m.name.toLowerCase() === game.name.toLowerCase());
    addGame({ ...game, mobileSlug: mobileMatch?.game });
  }

  return (
    <div className="group flex cursor-pointer items-center justify-between rounded-(--border-radius-md) px-1.75 py-1.25 hover:bg-(--color-background-secondary)">
      <div>
        <div className="text-[12px] text-(--color-text-primary)">
          <HighlightedName name={game.name} query={query} />
        </div>
        <div className="mt-px text-[11px] text-(--color-text-tertiary)">{game.provider}</div>
      </div>
      <button
        onClick={handleAdd}
        disabled={isSelected}
        className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-md border-[0.5px] border-(--color-border-secondary) bg-(--color-background-primary) text-(--color-text-secondary) opacity-0 group-hover:opacity-100 disabled:opacity-30"
      >
        <PlusIcon size={9} weight="bold" />
      </button>
    </div>
  );
}

function HighlightedName({ name, query }: { name: string; query: string }) {
  if (!query.trim()) return <>{name}</>;
  const idx = name.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{name}</>;
  return (
    <>
      {name.slice(0, idx)}
      <em className="font-medium text-[#185fa5] not-italic">
        {name.slice(idx, idx + query.length)}
      </em>
      {name.slice(idx + query.length)}
    </>
  );
}
