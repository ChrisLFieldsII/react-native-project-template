import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

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
  return <Text>Home</Text>;
};

const AccountScreen = () => {
  return <Text>Account</Text>;
};

type Tab = {
  name: string;
  component: () => JSX.Element;
};

const TABS: Tab[] = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Account',
    component: AccountScreen,
  },
];

const RootScreen = () => {
  return (
    <Tab.Navigator>
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
