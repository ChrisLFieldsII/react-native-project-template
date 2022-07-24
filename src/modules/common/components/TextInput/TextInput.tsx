import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

export const TextInput = (props: RNTextInputProps) => {
  return <RNTextInput {...props} />;
};
