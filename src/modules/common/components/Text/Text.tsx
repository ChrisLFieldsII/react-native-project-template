import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export const Text = (props: RNTextProps) => {
  return <RNText {...props} />;
};
