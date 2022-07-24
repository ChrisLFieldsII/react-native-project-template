import React from 'react';
import { View as RNView, ViewProps as RNViewProps } from 'react-native';

export const View = (props: RNViewProps) => {
  return <RNView {...props} />;
};
