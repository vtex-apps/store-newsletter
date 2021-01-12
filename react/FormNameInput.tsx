import React, { ChangeEvent, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Input } from 'vtex.styleguide'
import { formatIOMessage } from 'vtex.native-types'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'

import {
  useNewsletterDispatch,
  useNewsletterState,
} from './components/NewsletterContext'

const CSS_HANDLES = ['nameInputContainer'] as const

interface Props {
  placeholderText?: string
  inputLabel?: string
  errorMessage?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function FormNameInput(props: Props) {
  const {
    placeholderText = 'store/newsletter-input-name.placeholderText.default',
    errorMessage = 'store/newsletter-input-name.errorMessage.default',
    inputLabel,
    classes,
  } = props

  const { invalidName } = useNewsletterState()
  const dispatch = useNewsletterDispatch()
  const { withModifiers } = useCssHandles(CSS_HANDLES, { classes })
  const intl = useIntl()

  // Initialize `name` context value to signal that there is a FormNameInput
  // being rendered inside the newsletter form.
  useEffect(() => dispatch({ type: 'UPDATE_NAME', value: '' }), [dispatch])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_NAME', value: e.target.value.trim() })
  }

  return (
    <div
      className={`${withModifiers(
        'nameInputContainer',
        invalidName ? 'invalid' : ''
      )}`}
    >
      <Input
        id="newsletter-input-name"
        name="newsletter"
        onChange={handleChange}
        label={formatIOMessage({ id: inputLabel, intl })}
        errorMessage={
          invalidName ? formatIOMessage({ id: errorMessage, intl }) : null
        }
        placeholder={formatIOMessage({ id: placeholderText, intl })}
      />
    </div>
  )
}

FormNameInput.schema = {
  title: 'admin/editor.newsletter-input-name.title',
}

export default FormNameInput
