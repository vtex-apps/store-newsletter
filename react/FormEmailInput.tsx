import React, { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'
import { Input } from 'vtex.styleguide'
import { IOMessage, formatIOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'

import {
  useNewsletterDispatch,
  useNewsletterState,
} from './components/NewsletterContext'

interface Props {
  placeholderText?: string
  inputLabel?: string
  errorMessage?: string
}

const CSS_HANDLES = ['emailInputContainer', 'emailInputLabel'] as const

function FormEmailInput(props: Props) {
  const {
    placeholderText = 'store/newsletter-input-email.placeholderText.default',
    errorMessage = 'store/newsletter-input-email.errorMessage.default',
    inputLabel,
  } = props

  const { invalidEmail } = useNewsletterState()
  const dispatch = useNewsletterDispatch()
  const handles = useCssHandles(CSS_HANDLES)
  const intl = useIntl()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_EMAIL', value: e.target.value.trim() })
  }

  return (
    <div className={handles.emailInputContainer}>
      <label
        className={handles.emailInputLabel}
        htmlFor="newsletter-input-email"
      >
        <IOMessage id={inputLabel} />
      </label>
      <Input
        id="newsletter-input-email"
        name="newsletter"
        onChange={handleChange}
        errorMessage={
          invalidEmail ? formatIOMessage({ id: errorMessage, intl }) : null
        }
        placeholder={formatIOMessage({ id: placeholderText, intl })}
      />
    </div>
  )
}

FormEmailInput.schema = {
  title: 'admin/editor.newsletter-input-email.title',
}

export default FormEmailInput
