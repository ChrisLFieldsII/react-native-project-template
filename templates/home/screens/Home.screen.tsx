import React from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList, Screen } from '~/modules/navigation';
import { useHomeScreen } from '../hooks/useHomeScreen';
import { HomeView } from '../components';

type HomeScreenProps = StackScreenProps<HomeStackParamList, Screen.Home>;

export const HomeScreen = ({}: HomeScreenProps) => {
  const viewModel = useHomeScreen();

  return <HomeView {...viewModel} />;
};
