import React, { useState } from 'react'

interface Props {
  value: string
}

type FontWeightType = 'normal' | 'bold'

const SHOW_BORDER = true
const DO_NOT_SHOW_BORDER = false
type ShowBorderType = typeof SHOW_BORDER | typeof DO_NOT_SHOW_BORDER

interface StyleCSS {
  background: string
  borderColor: string
  fontWeight: FontWeightType
}

function getStyleCSS(
  color: string,
  fontWeight: FontWeightType,
  showBorder: ShowBorderType
): StyleCSS {
  return {
    background: color,
    borderColor: showBorder === SHOW_BORDER ? '#a0a0a0' : '#fafafa',
    fontWeight: fontWeight,
  }
}

function getStyle(status: number): StyleCSS {
  switch (status) {
    case 1:
      return getStyleCSS('#80ff80', 'bold', SHOW_BORDER)
    case 2:
      return getStyleCSS('#ffff40', 'normal', SHOW_BORDER)
    default:
      return getStyleCSS('#fafafa', 'normal', DO_NOT_SHOW_BORDER)
  }
}

const Clickable = (props: Props) => {
  const [status, setStatus] = useState(0)
  const style = getStyle(status)
  return (
    <span
      style={style}
      className="clickable"
      onClick={() => {
        setStatus((status + 1) % 3)
      }}
    >
      {props.value.trim()}
    </span>
  )
}

export default Clickable
