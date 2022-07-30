/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { Navigator } from '~/modules/navigation';
import { queryClient } from '~/modules/common';
import { Storybook } from '../.storybook/Storybook';

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navigator />
      </QueryClientProvider>
    </>
  );
};

// export default App;
export default Storybook;
