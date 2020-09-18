import React from 'react'
import { InfoCriterionType, TextAreaCriterionType } from './types'
import { TextField } from '@material-ui/core'
import { TFunction } from 'i18next'

interface Props {
  criterion: TextAreaCriterionType | InfoCriterionType
  criterionIndex: number
  removeCriterion: (criterionIndex: number) => () => void
  editCriterion: (criterionTitle: string) => void
  type: string
  t: TFunction
}

const TitleEditor = (props: Props): JSX.Element => {
  const handleCriterionTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    props.editCriterion(event.target.value)
  }
  const t = props.t
  const multiLine = props.type === 'InfoCriterion'
  return (
    <TextField
      value={props.criterion.title}
      multiline={multiLine}
      fullWidth
      rows={multiLine ? 3 : 1}
      variant={multiLine ? 'outlined' : 'standard'}
      helperText={
        props.type === 'TextAreaCriterion'
          ? t('textAreaTitleHelperText')
          : props.type === 'InfoCriterion'
          ? t('infoHelperText')
          : ''
      }
      onChange={handleCriterionTitleChange}
    />
  )
}

export default TitleEditor
