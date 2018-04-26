import React from 'react';
import { compose } from 'recompose';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';

import Form, { FormRow } from '@/components/Form';
import FormField from '@/components/FormField';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';

import { reduxFormValidate } from 'react-nebo15-validate';

const ActorForm = ({ initialValues, handleSubmit, t }) =>
    <Form onSubmit={handleSubmit}>
      <FormRow label={t('Actor name')}>
        <Field component={FormField} inputComponent={TextInput} name="name" />
      </FormRow>
      <FormRow>
        <Button type="submit">{t('Update')}</Button>
      </FormRow>
    </Form>

export default compose(
  translate(),
  reduxForm({
    form: 'movie-form',
    initialValues: {},
    validate: reduxFormValidate({
      title: {
        required: true,
      },
    }),
  })
)(ActorForm);
