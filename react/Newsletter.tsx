import React, { ComponentType, PropsWithChildren, FormEvent } from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'

import {
  NewsletterContextProvider,
  useNewsletterDispatch,
  useNewsletterState,
  MutationArguments,
  State,
} from './components/NewsletterContext'
import {
  validateEmail,
  validatePhoneNumber,
  validateUserName,
} from './modules/formValidators'

export const CSS_HANDLES = [
  'newsletterForm',
  'defaultSuccessMessage',
  'defaultErrorMessage',
] as const

interface Props {
  ErrorState?: ComponentType
  SuccessState?: ComponentType<{
    subscribedUserData?: {
      email: State['email']
      name: State['name']
      phone: State['phone']
    }
  }>
  LoadingState?: ComponentType
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

interface CustomField {
  name: string
  value: string | number | boolean | null
}

function generateMutationVariables({
  email,
  name,
  phone,
  customFields,
}: {
  email: string
  name: string | undefined | null
  phone: string | undefined | null
  customFields: CustomField[] | null
}) {
  const variables: MutationArguments = { email, fields: {} }

  if (name) {
    variables.fields.name = name
  }

  if (phone) {
    variables.fields.phone = phone
  }

  if (customFields) {
    customFields.forEach((customField) => {
      variables.fields[customField.name] = customField.value
    })
  }

  return variables
}

function Newsletter(props: PropsWithChildren<Props>) {
  const { ErrorState, SuccessState, LoadingState, classes, children } = props
  const {
    email,
    name,
    phone,
    submission,
    subscribe,
    customFields,
  } = useNewsletterState()

  const dispatch = useNewsletterDispatch()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })

  if (submission.loading && LoadingState) {
    return <LoadingState />
  }

  if (submission.error) {
    return ErrorState ? (
      <ErrorState />
    ) : (
      <p className={handles.defaultErrorMessage}>
        <FormattedMessage id="store/newsletter-submit-error.default" />
      </p>
    )
  }

  if (submission.data?.subscribeNewsletter) {
    return SuccessState ? (
      <SuccessState subscribedUserData={{ email, name, phone }} />
    ) : (
      <p className={handles.defaultSuccessMessage}>
        <FormattedMessage id="store/newsletter-submit-success.default" />
      </p>
    )
  }

  function validateFormInputs() {
    const isEmailValid = validateEmail(email)

    // name === null is valid because it means there is no name input in the
    // newsletter form.
    const isNameValid = name === null || validateUserName(name)

    // phone === null is valid because it means there is no phone input in the
    // newsletter form.
    const isPhoneValid = phone === null || validatePhoneNumber(phone)

    dispatch({
      type: 'SET_INVALID_EMAIL',
      value: !isEmailValid,
    })

    dispatch({
      type: 'SET_INVALID_NAME',
      value: !isNameValid,
    })

    dispatch({
      type: 'SET_INVALID_PHONE',
      value: !isPhoneValid,
    })

    return isNameValid && isPhoneValid && isEmailValid
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const areUserInputsValid = validateFormInputs()

    if (!areUserInputsValid) {
      return
    }

    const mutationVariables = generateMutationVariables({
      email,
      name,
      phone,
      customFields,
    })

    // The '.catch' here is to prevent 'unhandled promise rejection'.
    // Proper error handling for this is implemented by NewsletterContext
    // using the variables returned by the 'useMutation' call it performs.
    subscribe({ variables: mutationVariables }).catch(() => {})
  }

  return (
    <form className={handles.newsletterForm} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

function WrappedNewsletter(props: PropsWithChildren<Props>) {
  return (
    <NewsletterContextProvider>
      <Newsletter {...props}>{props.children}</Newsletter>
    </NewsletterContextProvider>
  )
}

WrappedNewsletter.schema = {
  title: 'admin/editor.newsletter-form.title',
}

export default WrappedNewsletter
