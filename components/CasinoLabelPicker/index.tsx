'use client';

import { Select } from '@base-ui/react';
import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react';
import { useState } from 'react';

const casinoLabels = [
  { label: 'MC NJ', value: 'betmgm:nj' },
  { label: 'MC PA', value: 'betmgm:pa' },
  { label: 'MC MI', value: 'betmgm:mi' },
  { label: 'MC WV', value: 'betmgm:wv' },
  { label: 'MC ON', value: 'betmgm:on' },
  { label: 'BC NJ', value: 'borgata:nj' },
  { label: 'BC PA', value: 'borgata:pa' },
  { label: 'PC NJ', value: 'partycasino:nj' },
  { label: 'WOF NJ', value: 'wof:nj' },
  { label: 'WOF ON', value: 'wof:on' },
];

export function CasinoLabelPicker() {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  return (
    <Select.Root items={casinoLabels} value={selectedLabel} onValueChange={setSelectedLabel}>
      <Select.Trigger className="flex min-w-28 cursor-pointer items-center justify-between gap-1.25 rounded-(--border-radius-md) border-[0.5px] border-(--color-border-secondary) bg-(--color-background-secondary) px-2.25 py-1 text-[12px] font-medium text-(--color-text-primary)">
        <Select.Value placeholder="Select a label" className="data-placeholder:opacity-60" />
        <Select.Icon className="data-popup-open:rotate-180">
          <CaretDownIcon size={10} weight="bold" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner alignItemWithTrigger={false} sideOffset={4}>
          <Select.Popup className="min-w-(--anchor-width) origin-(--transform-origin) rounded-(--border-radius-md) border-[0.5px] border-(--color-border-secondary) bg-(--color-background-secondary) py-1 shadow-md transition outline-none data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0">
            <Select.List>
              {casinoLabels.map(({ label, value }) => (
                <Select.Item
                  key={label}
                  value={value}
                  className="grid cursor-pointer grid-cols-[12px_1fr] items-center gap-1.25 px-2.25 py-1 text-[12px] font-medium text-(--color-text-primary) outline-none hover:bg-(--color-border-secondary) data-highlighted:bg-(--color-border-secondary)"
                >
                  <Select.ItemIndicator className="flex w-3 items-center">
                    <CheckIcon size={12} weight="bold" />
                  </Select.ItemIndicator>
                  <Select.ItemText className="col-start-2">{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
