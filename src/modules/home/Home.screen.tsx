import React from 'react';
// import {  } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList, Screen } from '~/modules/navigation';
import { View, Text } from '~/modules/common';

type HomeScreenProps = StackScreenProps<HomeStackParamList, Screen.Home>;

export const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <View>
      <Text>Home Screennnn</Text>
    </View>
  );
};
