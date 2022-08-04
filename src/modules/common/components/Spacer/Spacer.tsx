import React from 'react';
import { View, ViewStyle } from '~/modules/common';

type SpacerProps = {
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  style?: ViewStyle;
};

export const Spacer = ({ width, height, style }: SpacerProps) => {
  return <View style={{ ...style, width, height }} />;
};
