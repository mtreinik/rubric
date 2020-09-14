import React from 'react'
import { InfoCriterionType, TextAreaCriterionType } from './types'
import { Button, Grid, Icon, TextField } from '@material-ui/core'
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
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Button
            onClick={props.removeCriterion(props.criterionIndex)}
            color="secondary"
            startIcon={<Icon>remove_circle</Icon>}
          >
            {props.type === 'TextAreaCriterion'
              ? t('textArea')
              : props.type === 'InfoCriterion'
              ? t('info')
              : t('criterion')}
          </Button>
        </Grid>
        <Grid item xs={9}>
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
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TitleEditor
