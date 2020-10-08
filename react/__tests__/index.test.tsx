import React from 'react'
import { render } from '@vtex/test-tools/react'

import Newsletter from '../Newsletter'
import FormEmailInput from '../FormEmailInput'
import FormNameInput from '../FormNameInput'
import FormSubmit from '../FormSubmit'

describe('Basic rendering', () => {
  it('should render complete newsletter subscribe form', () => {
    const { getByPlaceholderText, getByText } = render(
      <Newsletter>
        <FormNameInput />
        <FormEmailInput />
        <FormSubmit />
      </Newsletter>
    )

    // newsletter-input-email block
    expect(
      getByPlaceholderText(
        'store/newsletter-input-email.placeholderText.default'
      )
    ).toBeTruthy()

    // newsletter-input-name block
    expect(
      getByPlaceholderText(
        'store/newsletter-input-name.placeholderText.default'
      )
    ).toBeTruthy()

    // newsletter-submit block
    expect(getByText('Subscribe')).toBeTruthy()
  })
})

describe('Form validation', () => {
  it.todo('should show error message if email is not a valid one')
  it.todo('should show error message if name is empty')
  it.todo(
    "should not show error message if name is empty but there's no name input being rendered"
  )
  it.todo('should not show error message if name and email are valid')
})

describe('Reacting to mutation results', () => {
  it.todo('should show success message if everything went well')
  it.todo('should show error message if something went wrong')
})
