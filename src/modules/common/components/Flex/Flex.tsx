import React from 'react';
import {} from 'react-native';

import { View, ViewProps } from '../View/View';

type FlexProps = ViewProps & {};

export const Flex = (props: FlexProps) => {
  return <View {...props} />;
};
