import React from 'react'
import { createSeparatedReactNodes } from './react-utils'
import Clickable from './Clickable'

export interface MultiSelectCriterionType {
  title: string
  options: string[]
}

const MultiSelectCriterion = (props: MultiSelectCriterionType): JSX.Element => {
  const clickables = createSeparatedReactNodes(
    props.options,
    (value, index) => <Clickable key={'clickable-' + index} value={value} />,
    (index) => <span key={'separator' + index}> / </span>
  )
  return (
    <div className="criterion">
      <span className="criterionTitle">{props.title}</span>
      <span> </span>
      {clickables}
    </div>
  )
}

export default MultiSelectCriterion
