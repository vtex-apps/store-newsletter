import { useEffect } from 'react'
import { useRuntime } from 'vtex.render-runtime'

import { useNewsletterDispatch } from './NewsletterContext'

interface CustomFieldInput {
  fieldName: string
  value?: string | number | boolean
  dynamicValue?: 'bindingUrl' | 'bindingId'
}

interface Props {
  customFields: CustomFieldInput[]
}

interface ResolvedCustomField {
  name: string
  value: string | number | boolean | null
}

function FormHiddenField({ customFields = [] }: Props) {
  const dispatch = useNewsletterDispatch()
  const runtime = useRuntime()

  const resolvedCustomFields = customFields.map((customField) => {
    const resolvedCustomField: ResolvedCustomField = {
      name: customField.fieldName,
      value: null,
    }

    const { dynamicValue } = customField

    if (customField.value) {
      resolvedCustomField.value = customField.value
    } else if (dynamicValue === 'bindingUrl') {
      resolvedCustomField.value = runtime.binding?.canonicalBaseAddress ?? null
    } else if (dynamicValue === 'bindingId') {
      resolvedCustomField.value = runtime.binding?.id ?? null
    }

    return resolvedCustomField
  })

  useEffect(() => {
    dispatch({
      type: 'SET_CUSTOM_VALUES',
      value: resolvedCustomFields,
    })
  }, [resolvedCustomFields, dispatch])

  return null
}

export default FormHiddenField
