import React from 'react'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'
import { IOMessage } from 'vtex.native-types'
import { Button } from 'vtex.styleguide'

import { useNewsletterState } from './components/NewsletterContext'

const CSS_HANDLES = ['formSubmitContainer'] as const

interface Props {
  submitButtonLabel?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function FormSubmit(props: Props) {
  const {
    submitButtonLabel = 'store/newsletter-submit.submitButtonLabel.default',
    classes,
  } = props

  const { submission } = useNewsletterState()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })

  return (
    <div className={handles.formSubmitContainer}>
      <Button type="submit" isLoading={submission.loading}>
        <IOMessage id={submitButtonLabel} />
      </Button>
    </div>
  )
}

FormSubmit.schema = {
  title: 'admin/editor.newsletter-submit.title',
}

export default FormSubmit
