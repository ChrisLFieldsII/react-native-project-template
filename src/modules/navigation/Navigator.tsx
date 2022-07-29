import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import { Text } from '~/modules/common';
import { HomeScreen } from '~/modules/home';
import { Screen } from './navigation.types';

const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name='Root' component={RootScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={Screen.Home} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const AccountScreen = () => {
  return <Text>Account</Text>;
};

type Tab = {
  name: Screen;
  component: () => JSX.Element;
  // TODO: could improve this to be a function that takes in diff states like `isFocused`
  icon: JSX.Element;
};

/** data structure to render bottom tab nav */
const TABS: Tab[] = [
  {
    name: Screen.HomeTab,
    component: HomeStackNavigator,
    icon: <Icon name='home' size={25} color='#000' />,
  },
  {
    name: Screen.AccountTab,
    component: AccountScreen,
    icon: <Icon name='user' size={25} color='#000' />,
  },
];

const RootScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TABS.find((currTab) => currTab.name === route.name);

        return {
          tabBarIcon: () => {
            return tab?.icon;
          },
        };
      }}
    >
      {TABS.map((tab) => {
        return (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
          />
        );
      })}
    </Tab.Navigator>
  );
};
