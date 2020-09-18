import React, { useState } from 'react'

interface Props {
  value: string
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
        setStatus((status + 1) % 3)
      }}
    >
      {props.value.trim()}
    </button>
  )
}

export default Clickable
