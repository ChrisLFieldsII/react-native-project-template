// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

export enum Screen {
  Root = 'Root',
  HomeTab = 'HomeTab',
  Home = 'Home',
  AccountTab = 'AccountTab',
  Account = 'Account',
  Debug = 'Debug',
}

export type HomeStackParamList = {
  [Screen.Home]: undefined;
};

export type RootStackParamList = {
  [Screen.Root]: {
    [Screen.HomeTab]: NavigatorScreenParams<HomeStackParamList>;
  };
  [Screen.Debug]: undefined;
};

export type Navigation = StackNavigationProp<RootStackParamList>;
