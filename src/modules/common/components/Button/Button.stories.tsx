import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Button } from './Button';
import { Text } from '../Text/Text';
import { View } from '../View/View';

const ButtonMeta: ComponentMeta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    children: <Text>Press ME</Text>,
    style: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
    },
  },
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

export default ButtonMeta;

type ButtonStory = ComponentStory<typeof Button>;

export const Basic: ButtonStory = (args) => <Button {...args} />;
