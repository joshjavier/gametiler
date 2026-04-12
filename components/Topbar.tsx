import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr';

import styles from './app.module.css';

export function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.wordmark}>
        <span className={styles.wmTitle}>Game Tiles</span>
        <span className={styles.wmSub}>Assemble</span>
      </div>
      <div className={styles.topbarRight}>
        <div className={styles.status}>
          <div className={styles.dot} />
          3,965 games
        </div>
        <div className={styles.brandPill}>
          MC NJ
          <CaretDownIcon size={10} weight="bold" />
        </div>
      </div>
    </div>
  );
}
