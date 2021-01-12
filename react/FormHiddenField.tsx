import { useEffect } from 'react'
import { useRuntime } from 'vtex.render-runtime'

import { useNewsletterDispatch } from './components/NewsletterContext'

type DynamicField = 'bindingUrl' | 'bindingId'

interface Props {
  dynamicFields: DynamicField[]
}

interface ResolvedCustomField {
  name: string
  value: string | undefined | null
}

function FormHiddenField({ dynamicFields = [] }: Props) {
  const dispatch = useNewsletterDispatch()
  const runtime = useRuntime()

  const resolvedCustomFields = dynamicFields.map((field) => {
    const resolvedCustomField: ResolvedCustomField = {
      name: field,
      value: null,
    }

    if (field === 'bindingUrl') {
      resolvedCustomField.value = runtime.binding?.canonicalBaseAddress ?? null
    }

    if (field === 'bindingId') {
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
