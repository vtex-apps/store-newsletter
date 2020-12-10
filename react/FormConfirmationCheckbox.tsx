import React, { ChangeEvent, useEffect } from 'react'
import { Checkbox } from 'vtex.styleguide'
import { IOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'

import {
  useNewsletterDispatch,
  useNewsletterState,
} from './components/NewsletterContext'
import LabelLink from './components/LabelLink'

interface Props {
  checkboxLabel?: string
  firstLabelLink?: {
    url: string
    text: string
  }
  secondLabelLink?: {
    url: string
    text: string
  }
}

const CSS_HANDLES = [
  'confirmationCheckboxContainer',
  'confirmationCheckboxLabel',
] as const

function FormConfirmationCheckbox(props: Props) {
  const {
    checkboxLabel = 'store/newsletter-checkbox-confirmation.checkboxLabel.default',
    firstLabelLink,
    secondLabelLink,
  } = props

  const dispatch = useNewsletterDispatch()
  const { confirmation } = useNewsletterState()

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
        label={
          <IOMessage
            id={checkboxLabel}
            values={{
              firstLink: firstLabelLink && (
                <LabelLink
                  text={firstLabelLink.text}
                  url={firstLabelLink.url}
                  ordinalPosition="first"
                />
              ),
              secondLink: secondLabelLink && (
                <LabelLink
                  text={secondLabelLink.text}
                  url={secondLabelLink.url}
                  ordinalPosition="second"
                />
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
