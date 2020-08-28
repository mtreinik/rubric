import React from 'react'
import { MultiSelectCriterionType } from './types'
import { Button, Grid, Icon, IconButton, TextField } from '@material-ui/core'

interface Props {
  criterion: MultiSelectCriterionType
  editCriterion: (criterionTitle: string) => void
  addOption: () => void
  removeOption: (optionIndex: number) => void
  editOption: (optionIndex: number) => (optionTitle: string) => void
}

const MultiSelectCriterionEditor = (props: Props): JSX.Element => {
  const handleCriterionTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    props.editCriterion(event.target.value)
  }
  const handleOptionTitleChange = (optionIndex: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    props.editOption(optionIndex)(event.target.value)
  }

  const clickables = props.criterion.options.map((option, optionIndex) => (
    <Grid item key={'option-' + optionIndex}>
      <TextField
        value={option}
        onChange={handleOptionTitleChange(optionIndex)}
      ></TextField>
      <IconButton
        onClick={() => props.removeOption(optionIndex)}
        color="secondary"
        size="small"
      >
        <Icon fontSize="small">remove_circle</Icon>
      </IconButton>{' '}
    </Grid>
  ))
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item>
        <TextField
          value={props.criterion.title}
          onChange={handleCriterionTitleChange}
        />
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={2}>
          {clickables}
          <Grid item>
            <Button
              onClick={props.addOption}
              size="small"
              startIcon={<Icon>add_circle</Icon>}
            >
              Lisää vaihtoehto
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MultiSelectCriterionEditor
