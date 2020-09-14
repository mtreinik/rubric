import React from 'react'
import { MultiSelectCriterionType } from './types'
import { Button, Grid, Icon, IconButton, TextField } from '@material-ui/core'
import { TFunction } from 'i18next'

interface Props {
  criterion: MultiSelectCriterionType
  criterionIndex: number
  removeCriterion: (criterionIndex: number) => () => void
  editCriterion: (criterionTitle: string) => void
  addOption: () => void
  removeOption: (optionIndex: number) => void
  editOption: (optionIndex: number) => (optionTitle: string) => void
  t: TFunction
}

const MultiSelectCriterionEditor = (props: Props): JSX.Element => {
  const t = props.t
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
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Button
            onClick={props.removeCriterion(props.criterionIndex)}
            color="secondary"
            startIcon={<Icon>remove_circle</Icon>}
          >
            {t('multiSelect')}
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <TextField
                value={props.criterion.title}
                helperText={t('multiSelectTitleHelperText')}
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
                    {t('addOption')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MultiSelectCriterionEditor
