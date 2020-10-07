import { ApolloError } from 'apollo-client'
import React, {
  createContext,
  useReducer,
  useContext,
  PropsWithChildren,
  useEffect,
} from 'react'
import { MutationFunction, useMutation } from 'react-apollo'

import subscribeNewsletterMutation from '../graphql/subscribeNewsletter.gql'

interface UpdateEmailAction {
  type: 'UPDATE_EMAIL'
  value: string
}
interface UpdateNameAction {
  type: 'UPDATE_NAME'
  value: string
}

interface SetInvalidEmailAction {
  type: 'SET_INVALID_EMAIL'
  value: boolean
}

interface SetInvalidNameAction {
  type: 'SET_INVALID_NAME'
  value: boolean
}

interface SetMutationValues {
  type: 'SET_MUTATION_VALUES'
  value: {
    mutationResult: boolean | undefined
    mutationLoading: boolean
    mutationError: ApolloError | undefined
  }
}

interface State {
  name: string
  email: string
  invalidEmail: boolean
  invalidName: boolean
  mutationResult: boolean | undefined
  mutationLoading: boolean
  mutationError: ApolloError | undefined
  subscribeMutation: MutationFunction<boolean, { email: string; name?: string }>
}

type Action =
  | UpdateEmailAction
  | UpdateNameAction
  | SetInvalidEmailAction
  | SetMutationValues
  | SetInvalidNameAction
type Dispatch = (action: Action) => void

const NewsletterStateContext = createContext<State | undefined>(undefined)
const NewsletterDispatchContext = createContext<Dispatch | undefined>(undefined)

function newsletterContextReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: action.value,
      }

    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.value,
      }

    case 'SET_INVALID_EMAIL':
      return {
        ...state,
        invalidEmail: action.value,
      }

    case 'SET_INVALID_NAME':
      return {
        ...state,
        invalidName: action.value,
      }

    case 'SET_MUTATION_VALUES': {
      return {
        ...state,
        mutationLoading: action.value.mutationLoading,
        mutationError: action.value.mutationError,
        mutationResult: action.value.mutationResult,
      }
    }

    default:
      return state
  }
}

function NewsletterContextProvider(props: PropsWithChildren<{}>) {
  const [
    subscribeToNewsletter,
    { data: mutationResult, loading, error },
  ] = useMutation<boolean, { email: string; name?: string }>(
    subscribeNewsletterMutation
  )

  const [state, dispatch] = useReducer(newsletterContextReducer, {
    name: '',
    email: '',
    invalidEmail: false,
    invalidName: false,
    mutationLoading: loading,
    mutationError: error,
    subscribeMutation: subscribeToNewsletter,
    mutationResult,
  })

  // Update mutation variables in State
  useEffect(() => {
    dispatch({
      type: 'SET_MUTATION_VALUES',
      value: { mutationLoading: loading, mutationError: error, mutationResult },
    })
  }, [error, loading, mutationResult])

  return (
    <NewsletterStateContext.Provider value={state}>
      <NewsletterDispatchContext.Provider value={dispatch}>
        {props.children}
      </NewsletterDispatchContext.Provider>
    </NewsletterStateContext.Provider>
  )
}

function useNewsletterState() {
  const context = useContext(NewsletterStateContext)

  if (context === undefined) {
    throw new Error(
      'useNewsletterState must be used within a NewsletterContextProvider'
    )
  }

  return context
}

function useNewsletterDispatch() {
  const context = useContext(NewsletterDispatchContext)

  if (context === undefined) {
    throw new Error(
      'useNewsletterDispatch must be used within a NewsletterContextProvider'
    )
  }

  return context
}

export { NewsletterContextProvider, useNewsletterDispatch, useNewsletterState }
