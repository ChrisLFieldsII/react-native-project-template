import React, { lazy, Suspense } from 'react';

// lazy import Storybook as it is heavy and bloats app bundle
const Storybook = lazy(() => import('./Storybook'));

export const StorybookScreen = () => {
  return (
    <Suspense fallback={null}>
      <Storybook />
    </Suspense>
  );
};
