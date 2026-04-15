import { Banner } from './Banner';
import { OutputDock } from './OutputDock';
import { SearchPanel } from './SearchPanel';
import { SelectedPanel } from './SelectedPanel';
import { Topbar } from './Topbar';

interface AppShellProps {
  brand?: string;
  state?: string;
}

export function AppShell({ brand, state }: AppShellProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-(--color-background-primary) font-[13px]">
      <Topbar />
      <Banner />
      <div className="flex flex-1 overflow-hidden">
        <SearchPanel />
        <div className="flex flex-1 flex-col">
          <SelectedPanel />
          <OutputDock />
        </div>
      </div>
    </div>
  );
}
