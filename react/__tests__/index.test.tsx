import React from 'react'
import { render, fireEvent, waitFor } from '@vtex/test-tools/react'

import Newsletter from '../Newsletter'
import FormEmailInput from '../FormEmailInput'
import FormNameInput from '../FormNameInput'
import FormPhoneInput from '../FormPhoneInput'
import FormSubmit from '../FormSubmit'
import subscribeNewsletter from '../graphql/subscribeNewsletter.gql'

const EMAIL_PLACEHOLDER_MESSAGE_ID =
  'store/newsletter-input-email.placeholderText.default'

const NAME_PLACEHOLDER_MESSAGE_ID =
  'store/newsletter-input-name.placeholderText.default'

const PHONE_PLACEHOLDER_MESSAGE_ID =
  'store/newsletter-input-phone.placeholderText.default'

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
    expect(getByPlaceholderText(EMAIL_PLACEHOLDER_MESSAGE_ID)).toBeTruthy()

    // newsletter-input-name block
    expect(getByPlaceholderText(NAME_PLACEHOLDER_MESSAGE_ID)).toBeTruthy()

    // newsletter-submit block
    expect(getByText('Subscribe')).toBeTruthy()
  })
})

describe('Form validation', () => {
  it('should show error message if email is not a valid one', () => {
    const { getByPlaceholderText, getByText } = render(
      <Newsletter>
        <FormEmailInput />
        <FormSubmit />
      </Newsletter>
    )

    const mockedInput = getByPlaceholderText(EMAIL_PLACEHOLDER_MESSAGE_ID)

    const submit = getByText('Subscribe')

    const wrongEmail = 'foobar'

    fireEvent.change(mockedInput, { target: { value: wrongEmail } })
    fireEvent.click(submit)

    expect(mockedInput).toHaveAttribute('data-errormessage')
  })

  it('should show error message if name is empty', () => {
    const { getByPlaceholderText, getByText } = render(
      <Newsletter>
        <FormNameInput />
        <FormSubmit />
      </Newsletter>
    )

    const mockedInput = getByPlaceholderText(NAME_PLACEHOLDER_MESSAGE_ID)

    const submit = getByText('Subscribe')

    fireEvent.click(submit)

    expect(mockedInput).toHaveAttribute('data-errormessage')
  })
})

describe('Reacting to mutation results', () => {
  it('should show success message if everything went well', async () => {
    const validEmail = 'foobar@vtex.com'
    const validPhone = '+5511123456789'
    const validName = 'Ted'

    const mocks = [
      {
        request: {
          query: subscribeNewsletter,
          variables: {
            email: validEmail,
            fields: { name: validName, phone: validPhone },
          },
        },
        result: {
          data: {
            subscribeNewsletter: {},
          },
        },
      },
    ]

    const { getByPlaceholderText, getByText } = render(
      <Newsletter>
        <FormEmailInput />
        <FormNameInput />
        <FormPhoneInput />
        <FormSubmit />
      </Newsletter>,
      {
        graphql: { mocks, addTypename: false },
      }
    )

    const mockedEmailInput = getByPlaceholderText(EMAIL_PLACEHOLDER_MESSAGE_ID)
    const mockedNameInput = getByPlaceholderText(NAME_PLACEHOLDER_MESSAGE_ID)
    const mockedPhoneInput = getByPlaceholderText(PHONE_PLACEHOLDER_MESSAGE_ID)

    const submit = getByText('Subscribe')

    fireEvent.change(mockedEmailInput, { target: { value: validEmail } })
    fireEvent.change(mockedNameInput, { target: { value: validName } })
    fireEvent.change(mockedPhoneInput, { target: { value: validPhone } })

    fireEvent.click(submit)

    const thanks = await waitFor(() => getByText('Thanks for subscribing!'))

    expect(thanks).toBeTruthy()
  })

  it('should show error message if something went wrong', async () => {
    const validEmail = 'foobar@vtex.com'
    const validName = 'Ted'

    const mocks = [
      {
        request: {
          query: subscribeNewsletter,
          variables: { email: validEmail, name: validName },
        },
        error: new Error('Something went wrong'),
      },
    ]

    const { getByPlaceholderText, getByText } = render(
      <Newsletter>
        <FormEmailInput />
        <FormNameInput />
        <FormSubmit />
      </Newsletter>,
      {
        graphql: { mocks, addTypename: false },
      }
    )

    const mockedEmailInput = getByPlaceholderText(EMAIL_PLACEHOLDER_MESSAGE_ID)
    const mockedNameInput = getByPlaceholderText(NAME_PLACEHOLDER_MESSAGE_ID)

    const submit = getByText('Subscribe')

    fireEvent.change(mockedEmailInput, { target: { value: validEmail } })
    fireEvent.change(mockedNameInput, { target: { value: validName } })

    fireEvent.click(submit)

    const sorry = await waitFor(() => getByText('Sorry, something went wrong.'))

    expect(sorry).toBeTruthy()
  })
})
