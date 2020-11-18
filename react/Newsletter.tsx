import React, { ComponentType, PropsWithChildren, FormEvent } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import {
  NewsletterContextProvider,
  useNewsletterDispatch,
  useNewsletterState,
  MutationArguments,
} from './components/NewsletterContext'
import DefaultSuccess from './components/Success'
import DefaultError from './components/Error'
import {
  validateEmail,
  validatePhoneNumber,
  validateUserName,
} from './modules/formValidators'
import { triggerPixelNewsletterEvent } from './modules/customPixelEvents'

interface Props {
  ErrorState?: ComponentType
  SuccessState?: ComponentType
  LoadingState?: ComponentType
}

const CSS_HANDLES = ['newsletterForm'] as const

function Newsletter(props: PropsWithChildren<Props>) {
  const { ErrorState, SuccessState, LoadingState, children } = props
  const { email, name, phone, submission, subscribe } = useNewsletterState()

  const dispatch = useNewsletterDispatch()
  const handles = useCssHandles(CSS_HANDLES)

  if (submission.loading && LoadingState) {
    return <LoadingState />
  }

  if (submission.error) {
    return ErrorState ? <ErrorState /> : <DefaultError />
  }

  if (submission.data?.subscribeNewsletter) {
    return SuccessState ? <SuccessState /> : <DefaultSuccess />
  }

  function generateMutationVariables() {
    const variables: MutationArguments = { email, fields: {} }

    if (name) {
      variables.fields.name = name
    }

    if (phone) {
      variables.fields.phone = phone
    }

    return variables
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

    triggerPixelNewsletterEvent({
      name,
      email,
      phone,
    })

    const mutationVariables = generateMutationVariables()

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
