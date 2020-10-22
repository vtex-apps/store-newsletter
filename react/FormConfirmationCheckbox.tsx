import React, { ChangeEvent, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Checkbox } from 'vtex.styleguide'
import { formatIOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'

import {
  useNewsletterDispatch,
  useNewsletterState,
} from './components/NewsletterContext'

interface Props {
  checkboxLabel?: string
}

const CSS_HANDLES = ['confirmationCheckboxContainer'] as const

function FormConfirmationCheckbox(props: Props) {
  const {
    checkboxLabel = 'store/newsletter-checkbox-confirmation.checkboxLabel.default',
  } = props

  const dispatch = useNewsletterDispatch()
  const { confirmation } = useNewsletterState()

  const intl = useIntl()
  const handles = useCssHandles(CSS_HANDLES)

  // Initialize `confirmation` context value to signal that there is a
  // FormConfirmationCheckbox being rendered inside the newsletter form.
  useEffect(() => dispatch({ type: 'UPDATE_CONFIRMATION', value: false }), [
    dispatch,
  ])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_CONFIRMATION', value: e.target.checked })
  }

  return (
    <div className={handles.confirmationCheckboxContainer}>
      <Checkbox
        id="newsletter-checkbox-confirmation"
        name="newsletter-confirmation"
        label={formatIOMessage({ id: checkboxLabel, intl })}
        onChange={handleChange}
        checked={confirmation}
        required
      />
    </div>
  )
}

FormConfirmationCheckbox.schema = {
  title: 'admin/editor.newsletter-checkbox-confirmation.title',
}

export default FormConfirmationCheckbox
