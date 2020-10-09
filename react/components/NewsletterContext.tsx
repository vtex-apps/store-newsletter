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

interface SubmissionState {
  error: undefined | ApolloError
  data: { subscribeNewsletter: boolean } | undefined
  loading: boolean
}

interface State {
  name: string
  email: string
  invalidEmail: boolean
  invalidName: boolean
  submission: SubmissionState
  subscribe: MutationFunction<
    { subscribeNewsletter: boolean },
    { email: string; name?: string }
  >
}

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
  value: SubmissionState
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
        submission: action.value,
      }
    }

    default:
      return state
  }
}

function NewsletterContextProvider(props: PropsWithChildren<{}>) {
  const [subscribeToNewsletter, { data, loading, error }] = useMutation<
    { subscribeNewsletter: boolean },
    { email: string; name?: string }
  >(subscribeNewsletterMutation)

  const [state, dispatch] = useReducer(newsletterContextReducer, {
    name: '',
    email: '',
    invalidEmail: false,
    invalidName: false,
    subscribe: subscribeToNewsletter,
    submission: {
      data,
      loading,
      error,
    },
  })

  // Update mutation variables in State
  useEffect(() => {
    dispatch({
      type: 'SET_MUTATION_VALUES',
      value: { loading, error, data },
    })
  }, [error, loading, data])

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
