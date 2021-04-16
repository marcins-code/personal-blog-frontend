// Button.stories.js

import React from 'react';
import Button from 'components/atoms/Button/Button';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Atoms/MyButton',
  component: Button,
  argTypes: {
    children: {
      name: 'children',
      type: { name: 'string', required: false },
      defaultValue: 'Hello',
      description: 'demo description',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Hello' },
      },
      control: {
        type: 'text',
      },
    },
    btnColor: {
      defaultValue: 'dark',
      control: {
        type: 'select',
        options: ['purple', 'indygo', 'cyan', 'teal', 'blue', 'orange', 'light', 'dark'],
      },
    },

    btnBig: {
      defaultValue: false,
      control: {
        type: 'boolean',
        options: [true, false],
      },
    },
  },
};

export const MyButton = (args) => (
  <Button
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...args}
  />
);
