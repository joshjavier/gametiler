import { LinkIcon, TrashIcon } from '@phosphor-icons/react/dist/ssr';

import { selectedGames } from './mock-data';

import styles from './app.module.css';

const TOTAL_COUNT = 97;
const SHOWN_COUNT = selectedGames.length;

export function SelectedPanel() {
  return (
    <>
      <div className={styles.selHeader}>
        <div className={styles.selLeft}>
          <span className={styles.selTitle}>Selected games</span>
          <span className={styles.countBadge}>{TOTAL_COUNT}</span>
        </div>
        <button className={styles.clearBtn}>Clear all</button>
      </div>

      <div className={styles.tblHeader}>
        <div>Name</div>
        <div>Provider</div>
        <div>Slug</div>
        <div style={{ textAlign: 'right' }}>Actions</div>
      </div>

      <div className={styles.tblBody}>
        {selectedGames.map((game) => (
          <div key={`${game.slug}`} className={styles.tblRow}>
            <div className={styles.cName}>{game.name}</div>
            <div className={styles.cProv}>{game.provider}</div>
            <div className={styles.cSlug}>
              <span className={styles.slugTag}>{game.slug}</span>
              {game.mobileSlug && <span className={styles.slugTag}>{game.mobileSlug}</span>}
            </div>
            <div className={styles.cActions}>
              <div className={styles.iBtn} title="Copy smartlink">
                <LinkIcon size={10} />
              </div>
              <div className={`${styles.iBtn} ${styles.iBtnDel}`} title="Remove">
                <TrashIcon size={10} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.overflowRow}>
        <span>
          Showing {SHOWN_COUNT} of {TOTAL_COUNT} —
        </span>
        <span className={styles.overflowNum}>+{TOTAL_COUNT - SHOWN_COUNT} more</span>
        <span style={{ color: 'var(--color-text-tertiary)' }}>scroll to see all</span>
      </div>
    </>
  );
}
