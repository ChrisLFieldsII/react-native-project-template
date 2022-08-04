/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { Navigator } from '~/modules/navigation';
import { queryClient } from '~/modules/common';

const App = () => {
  return (
    <Provider>
      <Navigator />
    </Provider>
  );
};

/**
 * Place all app providers here.
 */
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default App;
