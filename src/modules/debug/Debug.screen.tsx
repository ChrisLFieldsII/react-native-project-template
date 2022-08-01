import React from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, Screen } from '~/modules/navigation';

import { Text } from '~/modules/common';

type DebugScreenProps = StackScreenProps<RootStackParamList, Screen.Debug>;

export const DebugScreen = ({}: DebugScreenProps) => {
  return (
    <>
      <Text>Debug screen</Text>
    </>
  );
};
