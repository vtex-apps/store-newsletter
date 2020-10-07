import React, { ComponentType, PropsWithChildren, FormEvent } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useChildBlock } from 'vtex.render-runtime/react/components/ChildBlock'

import {
  NewsletterContextProvider,
  useNewsletterDispatch,
  useNewsletterState,
} from './components/NewsletterContext'

interface Props {
  ErrorState?: ComponentType
  SuccessState?: ComponentType
  LoadingState?: ComponentType
}

const CSS_HANDLES = ['newsletterForm', 'newsletterContainer'] as const

const EMAIL_REGEX = /^[A-z0-9+_-]+(?:\.[A-z0-9+_-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?$/

function validateEmail(email: string) {
  return EMAIL_REGEX.test(email)
}

function Newsletter(props: PropsWithChildren<Props>) {
  const { ErrorState, SuccessState, LoadingState, children } = props
  const {
    email,
    name,
    mutationError,
    mutationResult,
    mutationLoading,
    subscribeMutation,
  } = useNewsletterState()

  const dispatch = useNewsletterDispatch()
  const handles = useCssHandles(CSS_HANDLES)

  const receivedNameBlock = Boolean(
    useChildBlock({ id: 'newsletter-input-name' })
  )

  if (mutationLoading && LoadingState) {
    return <LoadingState />
  }

  if (mutationError) {
    return (ErrorState && <ErrorState />) || null
  }

  if (mutationResult) {
    return (SuccessState && <SuccessState />) || null
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const isEmailValid = validateEmail(email)
    const isNameValid = name.length > 0 || !receivedNameBlock

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

    const mutationVariables = receivedNameBlock ? { name, email } : { email }

    subscribeMutation({ variables: mutationVariables })
  }

  return (
    <div className={handles.newsletterContainer}>
      <form className={handles.newsletterForm} onSubmit={handleSubmit}>
        {children}
      </form>
    </div>
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
