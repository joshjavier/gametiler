import { ResultsList } from './ResultsList';
import { SearchBox } from './SearchBox';

const QUERY = 'book';

export function SearchPanel() {
  return (
    <div className="flex w-75 shrink-0 flex-col overflow-hidden border-r-[0.5px] border-r-(--color-border-tertiary)">
      <SearchBox query={QUERY} />
      <ResultsList query={QUERY} />
    </div>
  );
}
