import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr';

export function BrandPicker() {
  return (
    <div className="flex cursor-pointer items-center gap-1.25 rounded-(--border-radius-md) border-[0.5px] border-(--color-border-secondary) bg-(--color-background-secondary) px-2.25 py-1 text-[12px] font-medium text-(--color-text-primary)">
      MC NJ
      <CaretDownIcon size={10} weight="bold" />
    </div>
  );
}
