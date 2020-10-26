import React from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

interface Props {
  url: string
  text: string
  ordinalPosition: 'first' | 'second'
}

const CSS_HANDLES = ['labelLink']

function LabelLink(props: Props) {
  const { url, text, ordinalPosition } = props
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <a
      className={applyModifiers(handles.labelLink, ordinalPosition)}
      href={url}
    >
      {text}
    </a>
  )
}

export default LabelLink
