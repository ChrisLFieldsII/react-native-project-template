import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Spacer } from './Spacer';

const SpacerMeta: ComponentMeta<typeof Spacer> = {
  title: 'Spacer',
  component: Spacer,
  args: {

  },
  argTypes: {

  },
};

export default SpacerMeta;

type SpacerStory = ComponentStory<typeof Spacer>;

export const SpacerDefault: SpacerStory = (args) => <Spacer {...args} />;

