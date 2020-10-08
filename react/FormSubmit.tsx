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

  const { mutationLoading } = useNewsletterState()
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.formSubmitContainer}>
      <Button type="submit" isLoading={mutationLoading}>
        <IOMessage id={submitButtonLabel} />
      </Button>
    </div>
  )
}

FormSubmit.schema = {
  title: 'admin/editor.newsletter-submit.title',
}

export default FormSubmit
