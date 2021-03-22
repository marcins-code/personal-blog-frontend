// Button.stories.js

import React from 'react';
import Button from 'components/atoms/Button/Button';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Atoms/MyButton',
  component: Button,
  argTypes: {
    children: { defaultValue: 'Button', control: 'text' },
    btnType: {
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
  },
};

export const MyButton = (args) => (
  <Button
    btnType={args.btnType}
    btnOutline={args.btnOutline}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...args}
  >
    {args.children}
  </Button>
);
