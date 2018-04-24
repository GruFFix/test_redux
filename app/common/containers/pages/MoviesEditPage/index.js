import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { translate } from 'react-i18next';
import { updateMovie, fetchMovie } from '@/redux/data/movies';
import { getMovie } from '@/reducers';

import { provideHooks } from 'redial';

import MovieForm from '@/containers/forms/MovieForm';

import withStyles from 'withStyles';
import styles from './styles.scss';

const MoviesEditPage = ({ movie = {}, onSubmit, t }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {t('Edit movie')}
      </div>
      <div className={styles.back}>
        <Link to={`/movies/${movie.id}`}>{t('Back to detail page')}</Link>
      </div>
      <div className={styles.form}>
        <MovieForm initialValues={movie} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default compose(
  withStyles(styles),
  translate(),
  withRouter,
  provideHooks({
    fetch: ({ dispatch, setProps, params }) => dispatch(fetchMovie(params.id)).then((response) => {
      setProps({ movieId: response.payload.result });
    }),
  }),
  connect((state, ownProps) => ({
    movie: getMovie(state, ownProps.movieId),
  }), {
    updateMovie,
  }),
  withHandlers({
    onSubmit: ({ updateMovie, router }) => async (formValues) => {
      const response = await updateMovie(formValues.id, formValues);

      router.push(`/movies/${response.payload.result}`);
    },
  })
)(MoviesEditPage);
