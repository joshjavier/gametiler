import { InfoIcon } from '@phosphor-icons/react/dist/ssr';

import styles from './app.module.css';

export function Banner() {
  return (
    <div className={styles.banner}>
      <InfoIcon size={12} color="#BA7517" />
      Maintenance mode — a new version is in the works. Stay tuned!
      <button className={styles.bannerDismiss}>Dismiss</button>
    </div>
  );
}
