import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import { Text, Button } from '~/modules/common';

const RootStack = createStackNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name='Root' component={RootScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Button>
      <Text>Home screen</Text>
    </Button>
  );
};

const AccountScreen = () => {
  return <Text>Account</Text>;
};

type Tab = {
  name: string;
  component: () => JSX.Element;
  // TODO: could improve this to be a function that takes in diff states like `isFocused`
  icon: JSX.Element;
};

/** @desc data structure to render bottom tab nav */
const TABS: Tab[] = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: <Icon name='home' size={25} color='#000' />,
  },
  {
    name: 'Account',
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
