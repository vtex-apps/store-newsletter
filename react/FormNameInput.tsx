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

const CSS_HANDLES = ['nameInputContainer', 'nameInputLabel'] as const

function FormNameInput(props: Props) {
  const {
    placeholderText = 'store/newsletter-input-name.placeholderText.default',
    errorMessage = 'store/newsletter-input-name.errorMessage.default',
    inputLabel,
  } = props

  const { invalidName } = useNewsletterState()
  const dispatch = useNewsletterDispatch()
  const handles = useCssHandles(CSS_HANDLES)
  const intl = useIntl()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_NAME', value: e.target.value.trim() })
  }

  return (
    <div className={handles.nameInputContainer}>
      <label className={handles.nameInputLabel} htmlFor="newsletter-input-name">
        <IOMessage id={inputLabel} />
      </label>
      <Input
        id="newsletter-input-name"
        name="newsletter"
        onChange={handleChange}
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
