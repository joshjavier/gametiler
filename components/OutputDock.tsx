'use client';

import { CopyIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import { selectedGames, tileColors } from './mock-data';

type Tab = 'preview' | 'code';

const TOTAL_COUNT = 97;

export function OutputDock() {
  const [activeTab, setActiveTab] = useState<Tab>('preview');
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div
      data-active-tab={activeTab}
      className="group shrink-0 border-t-[0.5px] border-t-(--color-border-tertiary) bg-(--color-background-primary)"
    >
      <div className="flex items-center justify-between border-b-[0.5px] border-b-(--color-border-tertiary) px-3">
        <div className="flex">
          <button
            className="mb-[-0.5px] cursor-pointer border-b-2 border-b-transparent px-2.5 py-2 text-[12px] font-medium text-(--color-text-tertiary) group-data-[active-tab=preview]:border-b-(--color-text-primary) group-data-[active-tab=preview]:text-(--color-text-primary)"
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button
            className="mb-[-0.5px] cursor-pointer border-b-2 border-b-transparent px-2.5 py-2 text-[12px] font-medium text-(--color-text-tertiary) group-data-[active-tab=code]:border-b-(--color-text-primary) group-data-[active-tab=code]:text-(--color-text-primary)"
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            className="flex cursor-pointer items-center gap-1.25 rounded-(--border-radius-md) border-[0.5px] border-[#b5d4f4] bg-[#e6f1fb] px-2.25 py-1 text-[11px] font-medium text-[#0c447c]"
            onClick={handleCopy}
          >
            <CopyIcon size={11} />
            {copied ? 'Copied!' : 'Copy HTML'}
          </button>
        </div>
      </div>

      {!previewExpanded ? (
        <CollapsedPreview totalCount={TOTAL_COUNT} onExpand={() => setPreviewExpanded(true)} />
      ) : (
        <ExpandedPreview />
      )}
    </div>
  );
}

interface CollapsedPreviewProps {
  totalCount: number;
  onExpand: () => void;
}

function CollapsedPreview({ totalCount, onExpand }: CollapsedPreviewProps) {
  return (
    <div className="flex items-center justify-between border-t-[0.5px] border-t-(--color-border-tertiary) bg-white px-3 py-2.5">
      <div className="text-[12px] text-(--color-text-secondary)">
        <span className="font-medium text-(--color-text-primary)">{totalCount} tiles</span> ready —
        preview collapsed at this scale
      </div>
      <button className="cursor-pointer text-[11px] font-medium text-[#185fa5]" onClick={onExpand}>
        Show preview
      </button>
    </div>
  );
}

function ExpandedPreview() {
  return (
    <div className="max-h-35 overflow-y-auto bg-white p-3 pb-2.5">
      <div className="mb-2 font-[Arial,sans-serif] text-[12px] font-bold text-[#111]">
        Click Tiles Below To Play Eligible Games:
      </div>
      <div className="flex flex-wrap gap-1">
        {selectedGames.map((game, i) => {
          const [bg, tc] = tileColors[i % tileColors.length];
          return (
            <div
              key={game.slug}
              className="size-17.5 shrink-0 rounded-xs border-3 border-white bg-(--color-background-secondary) outline outline-[#ddd]"
            >
              <div
                className="flex size-full flex-col items-center justify-center p-0.5 text-center text-[8px] leading-[1.2] font-medium"
                style={{ background: bg, color: tc }}
              >
                {game.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
