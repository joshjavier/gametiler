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
      <Select.Trigger className="flex min-w-30 cursor-pointer items-center justify-between gap-1.25 rounded-(--border-radius-md) border-[0.5px] border-(--color-border-secondary) bg-(--color-background-secondary) px-2.25 py-1 text-[12px] font-medium text-(--color-text-primary)">
        <Select.Value placeholder="Select a brand" />
        <Select.Icon>
          <CaretDownIcon size={10} weight="bold" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner alignItemWithTrigger={false}>
          <Select.Popup>
            <Select.List>
              {casinoLabels.map(({ label, value }) => (
                <Select.Item key={label} value={value}>
                  <Select.ItemIndicator>
                    <CheckIcon size={12} weight="bold" />
                  </Select.ItemIndicator>
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
