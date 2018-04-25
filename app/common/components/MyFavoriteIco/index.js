import React from 'react';
import { compose } from 'recompose';
import withStyles from 'withStyles';
import styles from './styles.scss';

const MyFavorite = ({ isShow }) => isShow ? <div className={styles.root} /> : null;

export default compose(
  withStyles(styles)
)(MyFavorite);