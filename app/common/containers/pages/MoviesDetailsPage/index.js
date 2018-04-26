import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { provideHooks } from 'redial';
import { translate } from 'react-i18next';
import { fetchMovie, deleteMovie } from '@/redux/data/movies';
import { fetchActors } from '@/redux/data/actors';
import { getMovie } from '@/reducers';

import Poster from '@/components/Poster';
import Button from '@/components/Button';
import MyFavoriteIco from '@/components/MyFavoriteIco';

import withStyles from 'withStyles';
import styles from './styles.scss';

const MoviesDetailsPage = ({ movie = {}, t, onDeleteMovie }) => {
  const actorNames = (movie.actors || []).map(actor => actor.name);
  return (
    <div className={styles.root}>
      <div className={styles.poster}>
        <Poster src={movie.poster} title={movie.title} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          { movie.title } <MyFavoriteIco isShow={movie.is_favorite} />
        </div>
        <div className={styles.info}>
          <p>{ movie.year }</p>
          <p>{ movie.description }</p>
          <p>{ movie.director }</p>
          <div>
            Actors: {(movie.actors || []).map((actor, index) =>
              <React.Fragment key={actor.id}>
                <Link to={`/actros/${actor.id}`}>{actor.name}</Link>

                {index < movie.actors.length && ', '}
              </React.Fragment>
          )}
          </div>
          <p>
            <Link to="/movies">{t('Back to the list of movies')}</Link>
          </p>
        </div>

        <div className={styles.controlMovie}>
          <Button to={`/movies/${movie.id}/edit`}>{t('Edit movie')}e</Button>
        </div>

        <div className={styles.controlMovie}>
          <Button type="submit" red onClick={onDeleteMovie}>{t('Delete movie')}</Button>
        </div>
      </div>
    </div>
  );
};

export default compose(
  withStyles(styles),
  translate(),
  withRouter,
  provideHooks({
    fetch: ({ dispatch, setProps, params }) => Promise.all([
      dispatch(fetchMovie(params.id)),
      dispatch(fetchActors()),
    ]).then((response) => {
      setProps({ movieId: response[0].payload.result });
    }),
  }),
  connect((state, ownProps) => ({
    movie: getMovie(state, ownProps.movieId),
  }), { deleteMovie }),
  withHandlers({
    onDeleteMovie: ({ deleteMovie, router, movie }) => async () => {
       await deleteMovie(movie.id);

       router.push('/movies');
    },
  })
)(MoviesDetailsPage);
