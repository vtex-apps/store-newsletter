import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['defaultErrorContainer', 'defaultErrorMessage'] as const

function DefaultError() {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`flex justify-center pv5 ${handles.defaultErrorContainer}`}>
      <p className={handles.defaultErrorMessage}>
        <FormattedMessage id="store/newsletter-submit-error.default" />
      </p>
    </div>
  )
}

export default DefaultError
