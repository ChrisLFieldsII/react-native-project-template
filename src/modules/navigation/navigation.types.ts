// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';

export enum Screen {
  Root = 'Root',
  HomeTab = 'HomeTab',
  Home = 'Home',
  AccountTab = 'AccountTab',
  Account = 'Account',
}

export type HomeStackParamList = {
  [Screen.Home]: undefined;
};

export type RootStackParamList = {
  [Screen.Root]: {
    [Screen.HomeTab]: NavigatorScreenParams<HomeStackParamList>;
  };
};
