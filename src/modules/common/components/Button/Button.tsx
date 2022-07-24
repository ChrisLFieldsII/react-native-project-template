import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonProps = TouchableOpacityProps & {};

export const Button = (props: ButtonProps) => {
  return <TouchableOpacity {...props} />;
};
