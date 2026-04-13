import { PlusIcon } from '@phosphor-icons/react/dist/ssr';

import { searchResults } from '../mock-data';

interface ResultsListProps {
  query: string;
}

export function ResultsList({ query }: ResultsListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-1.5 py-1">
      {searchResults.map((result, i) => (
        <div
          key={result.name}
          className={[
            'flex items-center justify-between py-1.25 px-1.75 rounded-(--border-radius-md) cursor-pointer hover:bg-(--color-background-secondary) group',
            i === 0 && 'bg-(--color-background-secondary)',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div>
            <div className="text-[12px] text-(--color-text-primary)">
              <HighlightedName name={result.name} query={query} />
            </div>
            <div className="mt-px text-[11px] text-(--color-text-tertiary)">{result.provider}</div>
          </div>
          <div
            className={[
              'flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-md border-[0.5px] border-(--color-border-secondary) bg-(--color-background-primary) text-(--color-text-secondary) opacity-0 group-hover:opacity-100',
              i === 0 && 'opacity-100',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <PlusIcon size={9} weight="bold" />
          </div>
        </div>
      ))}
    </div>
  );
}

function HighlightedName({ name, query }: { name: string; query: string }) {
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
