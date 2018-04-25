import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CheckBox from './index';

storiesOf('components/CheckBox', module)
  .add('General', () => (
    <CheckBox onChange={action('change')} />
  )).add('Checked', () => (
    <CheckBox checked onChange={action('change')} />
  ));
