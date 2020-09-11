import React from 'react'
import { TextAreaCriterionType } from './types'
import { Grid, Icon, IconButton, TextField } from '@material-ui/core'

interface Props {
  criterion: TextAreaCriterionType
  criterionIndex: number
  removeCriterion: (criterionIndex: number) => () => void
  editCriterion: (criterionTitle: string) => void
}

const TextAreaEditor = (props: Props): JSX.Element => {
  const handleCriterionTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    props.editCriterion(event.target.value)
  }
  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item>
          <IconButton
            onClick={props.removeCriterion(props.criterionIndex)}
            color="secondary"
            size="small"
          >
            <Icon fontSize="small">remove_circle</Icon>
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            value={props.criterion.title}
            onChange={handleCriterionTitleChange}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TextAreaEditor
