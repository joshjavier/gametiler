import { MagnifyingGlassIcon, PlusIcon } from '@phosphor-icons/react/dist/ssr';

import { searchResults } from './mock-data';

import styles from './app.module.css';

const QUERY = 'book';

function HighlightedName({ name, query }: { name: string; query: string }) {
  const idx = name.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{name}</>;
  return (
    <>
      {name.slice(0, idx)}
      <em>{name.slice(idx, idx + query.length)}</em>
      {name.slice(idx + query.length)}
    </>
  );
}

export function SearchPanel() {
  return (
    <div className={styles.left}>
      <div className={styles.searchBox}>
        <div className={styles.searchWrap}>
          <MagnifyingGlassIcon className={styles.searchIcon} size={13} />
          <input
            className={styles.searchInput}
            placeholder="Search by game name…"
            defaultValue={QUERY}
            readOnly
          />
        </div>
      </div>
      <div className={styles.resultsList}>
        {searchResults.map((result, i) => (
          <div key={result.name} className={`${styles.rItem}${i === 0 ? ` ${styles.hi}` : ''}`}>
            <div>
              <div className={styles.rName}>
                <HighlightedName name={result.name} query={QUERY} />
              </div>
              <div className={styles.rProv}>{result.provider}</div>
            </div>
            <div className={styles.addIcon}>
              <PlusIcon size={9} weight="bold" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
