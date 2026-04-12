'use client';

import { CopyIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import { selectedGames, tileColors } from './mock-data';

import styles from './app.module.css';

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
    <div className={styles.outputDock}>
      <div className={styles.outputBar}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab}${activeTab === 'preview' ? ` ${styles.active}` : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button
            className={`${styles.tab}${activeTab === 'code' ? ` ${styles.active}` : ''}`}
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
        </div>
        <div className={styles.outputActions}>
          <button className={`${styles.copyBtn} ${styles.copyBtnPrimary}`} onClick={handleCopy}>
            <CopyIcon size={11} />
            {copied ? 'Copied!' : 'Copy HTML'}
          </button>
        </div>
      </div>

      {!previewExpanded ? (
        <div className={styles.collapsedPreview}>
          <div className={styles.collapsedInfo}>
            <span>{TOTAL_COUNT} tiles</span> ready — preview collapsed at this scale
          </div>
          <button className={styles.expandBtn} onClick={() => setPreviewExpanded(true)}>
            Show preview
          </button>
        </div>
      ) : (
        <div className={styles.previewScroll}>
          <div className={styles.previewHead}>Click Tiles Below To Play Eligible Games:</div>
          <div className={styles.tilesWrap}>
            {selectedGames.map((game, i) => {
              const [bg, tc] = tileColors[i % tileColors.length];
              return (
                <div key={game.slug} className={styles.tile}>
                  <div className={styles.tileInner} style={{ background: bg, color: tc }}>
                    {game.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
