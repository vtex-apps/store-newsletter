export const useCssHandles = (cssHandles: string[]) => {
  const handles: Record<string, string> = {}

  cssHandles.forEach((handle) => {
    handles[handle] = handle
  })

  const withModifiers = (baseHandle: string, modifier: string) =>
    `${baseHandle}--${modifier}`

  return { handles, withModifiers }
}
