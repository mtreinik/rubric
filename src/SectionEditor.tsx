import React from 'react'
import { Button, Icon, IconButton, Grid, TextField } from '@material-ui/core'
import { SectionType } from './types'
import MultiSelectCriterionEditor from './MultiSelectCriterionEditor'
import * as O from 'optics-ts'

const sectionTitlePrism = O.optic<SectionType>().prop('title')

const criterionContainersLens = O.optic<SectionType>().prop(
  'criterionContainers'
)

const newCriterionSetter = criterionContainersLens.appendTo()

const criterionPrism = (criterionIndex: number) =>
  criterionContainersLens.index(criterionIndex)

const criterionTitlePrism = (criterionIndex: number) =>
  criterionPrism(criterionIndex).path(['criterion', 'title'])

const optionPrism = (criterionIndex: number, optionIndex: number) =>
  criterionPrism(criterionIndex)
    .path(['criterion', 'options'])
    .index(optionIndex)

interface Props {
  section: SectionType
  editSection: (section: SectionType) => void
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

  const addCriterion = (): void => {
    props.editSection(
      O.set(newCriterionSetter)({
        type: 'MultiSelectCriterion',
        criterion: { title: 'Uusi kriteeri', options: ['eka', 'toka'] },
      })(props.section)
    )
  }

  const removeCriterion = (criterionIndex: number) => (): void => {
    props.editSection(O.remove(criterionPrism(criterionIndex))(props.section))
  }

  const addOption = (criterionIndex: number) => (): void => {
    const newOptionSetter = criterionPrism(criterionIndex)
      .prop('criterion')
      .prop('options')
      .appendTo()
    props.editSection(O.set(newOptionSetter)('Uusi vaihtoehto')(props.section))
  }

  const removeOption = (criterionIndex: number) => (
    optionIndex: number
  ): void => {
    props.editSection(
      O.remove(optionPrism(criterionIndex, optionIndex))(props.section)
    )
  }

  const editOption = (criterionIndex: number) => (optionIndex: number) => (
    optionTitle: string
  ): void => {
    props.editSection(
      O.set(optionPrism(criterionIndex, optionIndex))(optionTitle)(
        props.section
      )
    )
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid key="title" item xs={12}>
          <TextField
            value={props.section.title}
            onChange={handleSectionTitleChange}
          />
        </Grid>
        {props.section.criterionContainers.map(
          (criterionContainer, criterionIndex) => {
            if (criterionContainer.type === 'MultiSelectCriterion') {
              return (
                <Grid item key={'criterion-' + criterionIndex} xs={12}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <IconButton
                        onClick={removeCriterion(criterionIndex)}
                        color="secondary"
                        size="small"
                      >
                        <Icon fontSize="small">remove_circle</Icon>
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <MultiSelectCriterionEditor
                        editCriterion={editCriterion(criterionIndex)}
                        criterion={criterionContainer.criterion}
                        addOption={addOption(criterionIndex)}
                        removeOption={removeOption(criterionIndex)}
                        editOption={editOption(criterionIndex)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )
            } else {
              console.error(
                `unsupported criterion type '${criterionContainer.type}'`
              )
            }
          }
        )}
        <Grid item xs={12}>
          <Button
            onClick={addCriterion}
            size="small"
            startIcon={<Icon>add_circle</Icon>}
          >
            Lisää kriteeri
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default SectionEditor
