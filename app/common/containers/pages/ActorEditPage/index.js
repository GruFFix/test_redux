import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { translate } from 'react-i18next';
import { fetchActor, updateActor } from '@/redux/data/actors';
import { getActor } from '@/reducers';

import { provideHooks } from 'redial';

import ActorForm from '@/containers/forms/ActorForm';

import withStyles from 'withStyles';
import styles from './styles.scss';

const ActorEditPage = ({ actor = {}, onSubmit, t }) => {
  console.log(actor);
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {t('Edit actor')}
      </div>
      <div className={styles.form}>
        <ActorForm initialValues={actor} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default compose(
  withStyles(styles),
  translate(),
  withRouter,
  provideHooks({
    fetch: ({ dispatch, setProps, params }) => dispatch(fetchActor(params.id)).then((response) => {
      console.log(response);
      setProps({ actorId: response.payload.result });
    }),
  }),
  connect((state, ownProps) => ({
    actor: getActor(state, ownProps.actorId),
  }), {
    updateActor,
  }),
  withHandlers({
    onSubmit: ({ updateActor, router }) => async (formValues) => {
      await updateActor(formValues.id, formValues);

      router.push(`/movies`);
    },
  })
)(ActorEditPage);
