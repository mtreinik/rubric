import React, { useState } from 'react'
import { SelectionType } from './types'

interface Props {
  value: string
  selection: SelectionType
  warnAboutSelection: () => void
}

function getClasses(status: number): string {
  switch (status) {
    case 1:
      return 'clickable full'
    case 2:
      return 'clickable partial'
  }
  return 'clickable'
}

const Clickable = (props: Props): JSX.Element => {
  const [status, setStatus] = useState(0)
  return (
    <button
      className={getClasses(status)}
      onClick={() => {
        if (props.selection) {
          props.warnAboutSelection()
        } else {
          setStatus((status + 1) % 3)
        }
      }}
    >
      {props.value.trim()}
    </button>
  )
}

export default Clickable
