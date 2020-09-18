import React from 'react'
import { createSeparatedReactNodes } from './react-utils'
import Clickable from './Clickable'
import { MultiSelectCriterionType } from './types'

const MultiSelectCriterionView = (
  props: MultiSelectCriterionType
): JSX.Element => {
  const clickables = createSeparatedReactNodes(
    props.options,
    (value, index) => <Clickable key={'clickable-' + index} value={value} />,
    (index) => <span key={'separator' + index}> / </span>
  )
  return (
    <div className="criterion">
      <span className="criterionTitle">{props.title}</span> {clickables}
    </div>
  )
}

export default MultiSelectCriterionView
