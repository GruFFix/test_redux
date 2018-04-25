import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withStyles';
import classnames from 'classnames';
import { compose } from 'recompose';

import styles from './styles.scss';

const CheckBox = ({ error, ...rest }) => <input type="checkbox" checked={rest.value} className={classnames(styles.root, error && styles.isError)} {...rest} />

CheckBox.propTypes = {
  error: PropTypes.bool,
};

export default compose(
  withStyles(styles)
)(CheckBox);
