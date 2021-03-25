const push = jest.fn()

export function usePixel() {
  return {
    push,
  }
}
