import React, { ChangeEvent, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Input } from 'vtex.styleguide'
import { formatIOMessage } from 'vtex.native-types'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'

import {
  useNewsletterDispatch,
  useNewsletterState,
} from './components/NewsletterContext'

const CSS_HANDLES = ['phoneInputContainer'] as const

interface Props {
  placeholderText?: string
  inputLabel?: string
  errorMessage?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function FormPhoneInput(props: Props) {
  const {
    placeholderText = 'store/newsletter-input-phone.placeholderText.default',
    errorMessage = 'store/newsletter-input-phone.errorMessage.default',
    inputLabel,
    classes,
  } = props

  const { invalidPhone } = useNewsletterState()
  const dispatch = useNewsletterDispatch()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const intl = useIntl()

  // Initialize `phone` context value to signal that there is a FormPhoneInput
  // being rendered inside the newsletter form.
  useEffect(() => dispatch({ type: 'UPDATE_PHONE', value: '' }), [dispatch])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_PHONE', value: e.target.value.trim() })
  }

  return (
    <div className={handles.phoneInputContainer}>
      <Input
        id="newsletter-input-phone"
        name="newsletter"
        type="tel"
        label={formatIOMessage({ id: inputLabel, intl })}
        onChange={handleChange}
        errorMessage={
          invalidPhone ? formatIOMessage({ id: errorMessage, intl }) : null
        }
        placeholder={formatIOMessage({ id: placeholderText, intl })}
      />
    </div>
  )
}

FormPhoneInput.schema = {
  title: 'admin/editor.newsletter-input-phone.title',
}

export default FormPhoneInput
