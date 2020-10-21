import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessage } from 'vtex.native-types'
import { Button } from 'vtex.styleguide'

import { useNewsletterState } from './components/NewsletterContext'

interface Props {
  submitButtonLabel?: string
}

const CSS_HANDLES = ['formSubmitContainer'] as const

function FormSubmit(props: Props) {
  const {
    submitButtonLabel = 'store/newsletter-submit.submitButtonLabel.default',
  } = props

  const { submission, confirmation } = useNewsletterState()
  const handles = useCssHandles(CSS_HANDLES)

  // Makes sure the submit button cannot be pressed if there is a
  // 'newsletter-checkbox-confirmation' in the newsletter form and
  // it's not checked.
  const shouldBeDisabled = confirmation === false

  return (
    <div className={handles.formSubmitContainer}>
      <Button
        disabled={shouldBeDisabled}
        type="submit"
        isLoading={submission.loading}
      >
        <IOMessage id={submitButtonLabel} />
      </Button>
    </div>
  )
}

FormSubmit.schema = {
  title: 'admin/editor.newsletter-submit.title',
}

export default FormSubmit
