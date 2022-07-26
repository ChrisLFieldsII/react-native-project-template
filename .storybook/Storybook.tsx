import React from 'react';
import { getStorybookUI } from '@storybook/react-native';
import { View } from 'react-native';

import './storybook.requires';

const StorybookUIRoot = getStorybookUI({});

export const Storybook = () => (
  <View style={{ flex: 1 }}>
    <StorybookUIRoot />
  </View>
);

export default Storybook;
