import React from 'react';
import {
  View as RNView,
  ViewProps as RNViewProps,
  ViewStyle,
} from 'react-native';

export type ViewProps = RNViewProps & ViewStyle & {};

export const View = (props: ViewProps) => {
  return <RNView {...props} />;
};

export type { ViewStyle };
