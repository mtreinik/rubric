import React from 'react'
import { createSeparatedReactNodes } from './react-utils'
import Clickable from './Clickable'
import { MultiSelectCriterionType } from './MultiSelectCriterion'
import { TextField } from '@material-ui/core'

interface Props {
  editCriterion: (criterionTitle: string) => void
  criterion: MultiSelectCriterionType
}

const MultiSelectCriterionEditor = (props: Props): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.editCriterion(event.target.value)
  }
  const clickables = createSeparatedReactNodes(
    props.criterion.options,
    (value) => <Clickable key={value} value={value} />,
    (index) => <span key={'separator' + index}> / </span>
  )
  return (
    <>
      <TextField value={props.criterion.title} onChange={handleChange} />
      <span> </span>
      {clickables}
    </>
  )
}

export default MultiSelectCriterionEditor
