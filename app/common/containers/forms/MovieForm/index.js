import React from 'react';
import { compose } from 'recompose';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';

import Form, { FormRow } from '@/components/Form';
import FormField from '@/components/FormField';
import TextInput from '@/components/TextInput';
import TextareaInput from '@/components/TextareaInput';
import CheckBox from '@/components/CheckBox';
import Button from '@/components/Button';

import { reduxFormValidate } from 'react-nebo15-validate';
import { imageUrlValidation } from '@/helpers/validate';

const MovieForm = ({ initialValues, handleSubmit, t }) => {

  const isInitialValues = initialValues.id;
  const buttonText = isInitialValues ? t('Update') : t('Create');

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label={t('Title')}>
        <Field component={FormField} initialValues="13" inputComponent={TextInput} name="title" />
      </FormRow>
      <FormRow label={t('Poster url')}>
        <Field component={FormField} inputComponent={TextInput} name="poster" />
      </FormRow>
      <FormRow label={t('Description')}>
        <Field component={FormField} inputComponent={TextareaInput} name="description" />
      </FormRow>
      <FormRow label={t('Year')}>
        <Field component={FormField} inputComponent={TextInput} name="year" type="number" />
      </FormRow>
      <FormRow label={t('Director')}>
        <Field component={FormField} inputComponent={TextInput} name="director" />
      </FormRow>
      <FormRow label={t('My favorite')}>
        <Field component={FormField} inputComponent={CheckBox} name="is_favorite" />
      </FormRow>
      <FormRow>
        <Button type="submit">{buttonText}</Button>
      </FormRow>
    </Form>
  );
};

export default compose(
  translate(),
  reduxForm({
    form: 'movie-form',
    initialValues: {},
    validate: reduxFormValidate({
      title: {
        required: true,
      },
      poster: {
        required: true,
        imageUrl: true,
      },
      description: {
        required: true,
      },
      year: {
        required: true,
      },
      director: {
        required: true,
      },
    }),
  })
)(MovieForm);
