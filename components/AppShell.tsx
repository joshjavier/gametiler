import { Banner } from './Banner';
import { OutputDock } from './OutputDock';
import { SearchPanel } from './SearchPanel';
import { SelectedPanel } from './SelectedPanel';
import { Topbar } from './Topbar';

import styles from './app.module.css';

export function AppShell() {
  return (
    <div className={styles.shell}>
      <Topbar />
      <Banner />
      <div className={styles.body}>
        <SearchPanel />
        <div className={styles.right}>
          <SelectedPanel />
          <OutputDock />
        </div>
      </div>
    </div>
  );
}
