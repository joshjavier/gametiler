'use client';

import { useState } from 'react';

import { ResultsList } from './ResultsList';
import { SearchBox } from './SearchBox';

export function SearchPanel() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex w-75 shrink-0 flex-col overflow-hidden border-r-[0.5px] border-r-(--color-border-tertiary)">
      <SearchBox query={query} onQueryChange={setQuery} />
      <ResultsList query={query} />
    </div>
  );
}
