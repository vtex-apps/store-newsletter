export interface CustomPixelEventInterface {
  [key: string]: CustomPixelEventPropTypes | CustomPixelEventPropTypes[]
}

type CustomPixelEventPropTypes =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | unknown[]
  | null
