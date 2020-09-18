import React from 'react'
import {
  Button,
  Grid,
  Icon,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core'
import {
  MultiSelectCriterionSectionType,
  MultiSelectCriterionType,
  SectionType,
  TextAreaCriterionType,
} from './types'
import MultiSelectCriterionEditor from './MultiSelectCriterionEditor'
import * as O from 'optics-ts'
import TitleEditor from './TitleEditor'
import { TFunction } from 'i18next'

const sectionTitlePrism = O.optic<SectionType>().prop('title')

const criterionsLens = O.optic<SectionType>().prop('criterions')

const newCriterionSetter = criterionsLens.appendTo()

const criterionPrism = (criterionIndex: number) =>
  criterionsLens.index(criterionIndex)

const criterionTitlePrism = (criterionIndex: number) =>
  criterionPrism(criterionIndex).path(['criterion', 'title'])

const multiSelectCriterionsLens = O.optic<
  MultiSelectCriterionSectionType
>().prop('criterions')

const multiSelectCriterionPrism = (criterionIndex: number) =>
  multiSelectCriterionsLens.index(criterionIndex)

const optionPrism = (criterionIndex: number, optionIndex: number) =>
  multiSelectCriterionPrism(criterionIndex)
    .path(['criterion', 'options'])
    .index(optionIndex)

interface Props {
  section: SectionType
  editSection: (section: SectionType) => void
  moveCriterionUp: (criterionIndex: number) => void
  moveCriterionDown: (criterionIndex: number) => void
  t: TFunction
}

const SectionEditor = (props: Props): JSX.Element => {
  const handleSectionTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    props.editSection(
      O.set(sectionTitlePrism)(event.target.value)(props.section)
    )
  }

  const editCriterion = (criterionIndex: number) => (
    criterionTitle: string
  ): void => {
    props.editSection(
      O.set(criterionTitlePrism(criterionIndex))(criterionTitle)(props.section)
    )
  }

  const addCriterion = (criterionType: string) => (): void => {
    if (criterionType === 'MultiSelectCriterion') {
      props.editSection(
        O.set(newCriterionSetter)({
          type: criterionType,
          criterion: {
            title: '',
            options: [],
          },
        })(props.section)
      )
    } else if (criterionType === 'TextAreaCriterion') {
      props.editSection(
        O.set(newCriterionSetter)({
          type: criterionType,
          criterion: { title: '' },
        })(props.section)
      )
    } else if (criterionType === 'InfoCriterion') {
      props.editSection(
        O.set(newCriterionSetter)({
          type: criterionType,
          criterion: { title: '' },
        })(props.section)
      )
    } else {
      console.error(`unsupported criterion type '${criterionType}'`)
    }
  }

  const removeCriterion = (criterionIndex: number) => (): void => {
    props.editSection(O.remove(criterionPrism(criterionIndex))(props.section))
  }

  const addOption = (criterionIndex: number) => (): void => {
    const newOptionSetter = multiSelectCriterionPrism(criterionIndex)
      .prop('criterion')
      .prop('options')
      .appendTo()
    props.editSection(
      O.set(newOptionSetter)('')(
        props.section as MultiSelectCriterionSectionType
      )
    )
  }

  const removeOption = (criterionIndex: number) => (
    optionIndex: number
  ): void => {
    props.editSection(
      O.remove(optionPrism(criterionIndex, optionIndex))(
        props.section as MultiSelectCriterionSectionType
      )
    )
  }

  const editOption = (criterionIndex: number) => (optionIndex: number) => (
    optionTitle: string
  ): void => {
    props.editSection(
      O.set(optionPrism(criterionIndex, optionIndex))(optionTitle)(
        props.section as MultiSelectCriterionSectionType
      )
    )
  }

  const t = props.t
  return (
    <div>
      <Grid container spacing={2}>
        <Grid key="title" item xs={12}>
          <TextField
            value={props.section.title}
            helperText={t('sectionTitleHelperText')}
            onChange={handleSectionTitleChange}
            fullWidth
          />
        </Grid>
        {props.section.criterions.map((criterionAndType, criterionIndex) => {
          const type = criterionAndType.type
          const criterion = criterionAndType.criterion
          return (
            <Grid item xs={12} key={'criterion-' + criterionIndex}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Typography variant="button">
                    {' '}
                    {type === 'MultiSelectCriterion'
                      ? t('multiSelect')
                      : type === 'TextAreaCriterion'
                      ? t('textArea')
                      : type === 'InfoCriterion'
                      ? t('info')
                      : t('criterion')}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item>
                      <IconButton
                        onClick={() => props.moveCriterionUp(criterionIndex)}
                        disabled={criterionIndex <= 0}
                        size="small"
                      >
                        <Icon>arrow_upward</Icon>
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() => props.moveCriterionDown(criterionIndex)}
                        disabled={
                          criterionIndex >= props.section.criterions.length - 1
                        }
                        size="small"
                      >
                        <Icon>arrow_downward</Icon>
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={removeCriterion(criterionIndex)}
                        color="secondary"
                        size="small"
                      >
                        <Icon>remove_circle</Icon>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={9}>
                  {type === 'MultiSelectCriterion' && (
                    <MultiSelectCriterionEditor
                      criterionIndex={criterionIndex}
                      removeCriterion={removeCriterion}
                      editCriterion={editCriterion(criterionIndex)}
                      criterion={criterion as MultiSelectCriterionType}
                      addOption={addOption(criterionIndex)}
                      removeOption={removeOption(criterionIndex)}
                      editOption={editOption(criterionIndex)}
                      t={t}
                    />
                  )}
                  {(type === 'TextAreaCriterion' ||
                    type === 'InfoCriterion') && (
                    <TitleEditor
                      criterionIndex={criterionIndex}
                      removeCriterion={removeCriterion}
                      criterion={criterion as TextAreaCriterionType}
                      editCriterion={editCriterion(criterionIndex)}
                      type={type}
                      t={t}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          )
        })}
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item>
              <Button
                onClick={addCriterion('MultiSelectCriterion')}
                size="small"
                startIcon={<Icon>add_circle</Icon>}
              >
                {t('addMultiSelect')}
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={addCriterion('TextAreaCriterion')}
                size="small"
                startIcon={<Icon>add_circle</Icon>}
              >
                {t('addTextArea')}
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={addCriterion('InfoCriterion')}
                size="small"
                startIcon={<Icon>add_circle</Icon>}
              >
                {t('addInfo')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default SectionEditor