import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { HomeView } from './HomeView';

const HomeViewMeta: ComponentMeta<typeof HomeView> = {
  title: 'Home View',
  component: HomeView,
  args: {
    // @ts-ignore - ts doesnt like that theres a model when status is `loading`, but we are just mocking.
    status: 'loading',
    model: {
      title: 'Home View',
    },
    error: new Error('error fetching home contents'),
  },
  argTypes: {
    status: {
      control: { type: 'radio' },
      options: ['loading', 'success', 'error'],
    },
  },
};

export default HomeViewMeta;

type HomeViewStory = ComponentStory<typeof HomeView>;

export const HomeViewDefault: HomeViewStory = (args) => <HomeView {...args} />;
