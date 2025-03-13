import React from 'react'
import { SliderCriterionType, SliderRowType } from './types'
import { Button, Grid, Icon, IconButton, TextField } from '@material-ui/core'
import { TFunction } from 'i18next'

interface Props {
  criterion: SliderCriterionType
  criterionIndex: number
  removeCriterion: (criterionIndex: number) => () => void
  addOption: () => void
  removeOption: (optionIndex: number) => void
  editOption: (optionIndex: number) => (optionTitle: string) => void
  addSliderRow: () => void
  removeRow: (rowIndex: number) => void
  editRowTitle: (rowIndex: number) => (rowTitle: string) => void
  moveSliderRowUp: (rowIndex: number) => void
  moveSliderRowDown: (rowIndex: number) => void
  t: TFunction
}

const SliderEditor = (props: Props): JSX.Element => {
  const t = props.t
  const handleOptionTitleChange =
    (optionIndex: number) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      props.editOption(optionIndex)(event.target.value)
    }
  const handleSliderRowTitleChange =
    (rowIndex: number) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      props.editRowTitle(rowIndex)(event.target.value)
    }

  const options = props.criterion.options.map((option, optionIndex) => (
    <Grid item key={'option-' + optionIndex}>
      <IconButton
        onClick={() => props.removeOption(optionIndex)}
        color="secondary"
        size="small"
      >
        <Icon fontSize="small">remove_circle</Icon>
      </IconButton>{' '}
      <TextField
        value={option}
        helperText={t('sliderOptionHelperText')}
        onChange={handleOptionTitleChange(optionIndex)}
        autoFocus
      />
    </Grid>
  ))

  const rows = props.criterion.rows.map(
    (slider: SliderRowType, rowIndex: number) => (
      <Grid item xs={12} key={'slider-' + rowIndex}>
        <Grid container>
          <Grid item xs={1}>
            <IconButton
              onClick={() => props.moveSliderRowUp(rowIndex)}
              disabled={rowIndex <= 0}
              size="small"
            >
              <Icon>arrow_upward</Icon>
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={() => props.moveSliderRowDown(rowIndex)}
              disabled={rowIndex >= props.criterion.rows.length - 1}
              size="small"
            >
              <Icon>arrow_downward</Icon>
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={() => props.removeRow(rowIndex)}
              color="secondary"
              size="small"
            >
              <Icon fontSize="small">remove_circle</Icon>
            </IconButton>
          </Grid>
          <Grid item xs={9}>
            <TextField
              value={slider.title}
              helperText={t('sliderRowHelperText')}
              onChange={handleSliderRowTitleChange(rowIndex)}
              autoFocus
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
    )
  )
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container>{options}</Grid>
      </Grid>
      <Grid item>
        <Button
          style={{ marginLeft: '0.1em' }}
          onClick={props.addOption}
          size="small"
          startIcon={<Icon>add_circle</Icon>}
        >
          {t('addSliderOption')}
        </Button>
      </Grid>
      {rows}
      <Grid item>
        <Button
          style={{ marginLeft: '0.1em' }}
          onClick={props.addSliderRow}
          size="small"
          startIcon={<Icon>add_circle</Icon>}
        >
          {t('addSliderRow')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default SliderEditor
