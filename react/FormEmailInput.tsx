import React, { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'
import { Input } from 'vtex.styleguide'
import { formatIOMessage } from 'vtex.native-types'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'

import {
  useNewsletterDispatch,
  useNewsletterState,
} from './components/NewsletterContext'

const CSS_HANDLES = ['emailInputContainer'] as const

interface Props {
  placeholderText?: string
  inputLabel?: string
  errorMessage?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function FormEmailInput(props: Props) {
  const {
    placeholderText = 'store/newsletter-input-email.placeholderText.default',
    errorMessage = 'store/newsletter-input-email.errorMessage.default',
    inputLabel,
    classes,
  } = props

  const { invalidEmail } = useNewsletterState()
  const dispatch = useNewsletterDispatch()
  const { withModifiers } = useCssHandles(CSS_HANDLES, { classes })
  const intl = useIntl()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_EMAIL', value: e.target.value.trim() })
  }

  return (
    <div
      className={`${withModifiers(
        'emailInputContainer',
        invalidEmail ? 'invalid' : ''
      )}`}
    >
      <Input
        id="newsletter-input-email"
        type="email"
        name="newsletter"
        label={formatIOMessage({ id: inputLabel, intl })}
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
