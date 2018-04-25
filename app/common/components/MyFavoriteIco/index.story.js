import React from 'react';
import { storiesOf } from '@storybook/react';

import MyFavorite from './index';

storiesOf('components/MyFavorite', module)
  .add('General', () => (
    <MyFavorite isShow />
  ))