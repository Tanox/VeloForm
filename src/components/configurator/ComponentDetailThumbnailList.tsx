'use client';

import React from 'react';

function ComponentDetailThumbnailListBase() {
  return (
    <div className="flex gap-2 mt-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-16 h-16 rounded-xl bg-surface-tertiary border border-border-light overflow-hidden"
        >
          <div className="w-full h-full bg-gradient-to-br from-surface-tertiary to-surface" />
        </div>
      ))}
    </div>
  );
}

export const ComponentDetailThumbnailList = React.memo(ComponentDetailThumbnailListBase);
