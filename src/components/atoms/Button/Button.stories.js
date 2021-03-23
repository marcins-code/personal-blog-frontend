// Button.stories.js

import React from 'react';
import Button from 'components/atoms/Button/Button';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Atoms/MyButton',
  component: Button,
  argTypes: {
    label: {
      name: 'label',
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
      defaultValue: 'primary',
      control: {
        type: 'inline-radio',
        options: ['primary', 'secondary', 'tertiary', 'light', 'dark'],
      },
    },
    btnOutline: {
      defaultValue: false,
      control: {
        type: 'boolean',
        options: [true, false],
      },
    },
    btnBig: {
      defaultValue: false,
      control: {
        type: 'boolean',
        options: [true, false],
      },
    },
    icon: {
      defaultValue: 'fab safari',
      control: {
        type: 'select',
        options: ['fab safari', 'fas edit', 'fas tasks'],
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
