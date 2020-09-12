import React from 'react'
import { InfoCriterionType, TextAreaCriterionType } from './types'
import { Button, Grid, Icon, TextField } from '@material-ui/core'

interface Props {
  criterion: TextAreaCriterionType | InfoCriterionType
  criterionIndex: number
  removeCriterion: (criterionIndex: number) => () => void
  editCriterion: (criterionTitle: string) => void
  type: string
}

const TitleEditor = (props: Props): JSX.Element => {
  const handleCriterionTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    props.editCriterion(event.target.value)
  }
  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Button
            onClick={props.removeCriterion(props.criterionIndex)}
            color="secondary"
            startIcon={<Icon>remove_circle</Icon>}
          >
            {props.type === 'TextAreaCriterion'
              ? 'tekstilaatikko'
              : props.type === 'InfoCriterion'
              ? 'selite'
              : 'kriteeri'}
          </Button>
        </Grid>
        <Grid item xs={9}>
          <TextField
            value={props.criterion.title}
            onChange={handleCriterionTitleChange}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TitleEditor
