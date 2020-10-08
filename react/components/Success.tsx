import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'defaultSuccessContainer',
  'defaultSuccessMessage',
] as const

function DefaultSuccess() {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={`flex justify-center pv5 ${handles.defaultSuccessContainer}`}
    >
      <p className={handles.defaultSuccessMessage}>
        <FormattedMessage id="store/newsletter-submit-success.default" />
      </p>
    </div>
  )
}

export default DefaultSuccess
