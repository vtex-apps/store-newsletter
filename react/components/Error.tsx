import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['defaultErrorMessage'] as const

function DefaultError() {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <p className={handles.defaultErrorMessage}>
      <FormattedMessage id="store/newsletter-submit-error.default" />
    </p>
  )
}

export default DefaultError
