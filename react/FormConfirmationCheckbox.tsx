import React, { ChangeEvent, useEffect } from 'react'
import { Checkbox } from 'vtex.styleguide'
import { IOMessage } from 'vtex.native-types'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'

import { useNewsletterDispatch, useNewsletterState } from './NewsletterContext'

const CSS_HANDLES = [
  'confirmationCheckboxContainer',
  'confirmationCheckboxLabel',
  'labelLink',
] as const

interface Props {
  checkboxLabel?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
  firstLabelLink?: {
    url: string
    text: string
  }
  secondLabelLink?: {
    url: string
    text: string
  }
}

function FormConfirmationCheckbox(props: Props) {
  const {
    checkboxLabel = 'store/newsletter-checkbox-confirmation.checkboxLabel.default',
    firstLabelLink,
    secondLabelLink,
    classes,
  } = props

  const dispatch = useNewsletterDispatch()
  const { confirmation } = useNewsletterState()

  const { handles, withModifiers } = useCssHandles(CSS_HANDLES, { classes })

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
        label={
          <IOMessage
            id={checkboxLabel}
            values={{
              firstLink: (
                <a
                  className={withModifiers('labelLink', 'first')}
                  href={firstLabelLink?.url}
                >
                  {firstLabelLink?.text}
                </a>
              ),
              secondLink: (
                <a
                  className={withModifiers('labelLink', 'second')}
                  href={secondLabelLink?.url}
                >
                  {secondLabelLink?.text}
                </a>
              ),
            }}
          />
        }
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
