import { BrandPicker } from './BrandPicker';
import { Status } from './Status';

export function Topbar() {
  return (
    <div className="flex shrink-0 items-center justify-between border-b-[0.5px] border-b-(--color-border-tertiary) bg-(--color-background-primary) px-3.5 py-2.25">
      <div className="flex items-center gap-1.75">
        <span className="text-[14px] font-medium tracking-[-0.2px] text-(--color-text-primary)">
          GameTiler
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <Status />
        <BrandPicker />
      </div>
    </div>
  );
}
