import React, { ComponentType, PropsWithChildren, FormEvent } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import {
  NewsletterContextProvider,
  useNewsletterDispatch,
  useNewsletterState,
} from './components/NewsletterContext'
import DefaultSuccess from './components/Success'
import DefaultError from './components/Error'

interface Props {
  ErrorState?: ComponentType
  SuccessState?: ComponentType
  LoadingState?: ComponentType
}

const CSS_HANDLES = ['newsletterForm'] as const

// https://regex101.com/r/926sxf/1
// If you change the regex, don't forget to go to the link above, update it there and save.
const EMAIL_REGEX = /^[A-z0-9"+_-]+(?:\.[A-z0-9+_-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?$/

function validateEmail(email: string) {
  return EMAIL_REGEX.test(email)
}

function Newsletter(props: PropsWithChildren<Props>) {
  const { ErrorState, SuccessState, LoadingState, children } = props
  const { email, name, submission, subscribe } = useNewsletterState()

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const isEmailValid = validateEmail(email)

    // name === null is valid because it means there is no name input in the
    // newsletter form.
    const isNameValid = name === null || name?.length > 0

    dispatch({
      type: 'SET_INVALID_EMAIL',
      value: !isEmailValid,
    })

    dispatch({
      type: 'SET_INVALID_NAME',
      value: !isNameValid,
    })

    if (!isEmailValid || !isNameValid) {
      return
    }

    const mutationVariables = isNameValid
      ? { fields: { name }, email }
      : { email }

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
