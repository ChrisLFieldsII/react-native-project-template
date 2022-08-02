import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Flex } from './Flex';

const FlexMeta: ComponentMeta<typeof Flex> = {
  title: 'Flex',
  component: Flex,
  args: {

  },
  argTypes: {

  },
};

export default FlexMeta;

type FlexStory = ComponentStory<typeof Flex>;

export const FlexDefault: FlexStory = (args) => <Flex {...args} />;

