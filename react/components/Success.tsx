import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['defaultSuccessMessage'] as const

function DefaultSuccess() {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <p className={handles.defaultSuccessMessage}>
      <FormattedMessage id="store/newsletter-submit-success.default" />
    </p>
  )
}

export default DefaultSuccess
