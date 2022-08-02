import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import { Text } from '../Text/Text';

type ButtonProps = TouchableOpacityProps & {};

export const Button = (props: ButtonProps) => {
  const { children } = props;

  return (
    <TouchableOpacity style={styles.default} {...props}>
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'black',
  },
});
