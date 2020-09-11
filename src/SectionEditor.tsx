import React from 'react'
import { Button, Icon, Grid, TextField } from '@material-ui/core'
import {
  MultiSelectCriterionType,
  SectionType,
  TextAreaCriterionType,
} from './types'
import MultiSelectCriterionEditor from './MultiSelectCriterionEditor'
import * as O from 'optics-ts'
import TextAreaEditor from './TextAreaEditor'

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

  const addCriterion = (criterionType: string) => (): void => {
    props.editSection(
      O.set(newCriterionSetter)({
        type: criterionType,
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
                <MultiSelectCriterionEditor
                  key={'criterion-' + criterionIndex}
                  criterionIndex={criterionIndex}
                  removeCriterion={removeCriterion}
                  editCriterion={editCriterion(criterionIndex)}
                  criterion={
                    criterionContainer.criterion as MultiSelectCriterionType
                  }
                  addOption={addOption(criterionIndex)}
                  removeOption={removeOption(criterionIndex)}
                  editOption={editOption(criterionIndex)}
                />
              )
            } else if (criterionContainer.type === 'TextAreaCriterion') {
              return (
                <TextAreaEditor
                  key={'criterion-' + criterionIndex}
                  criterionIndex={criterionIndex}
                  removeCriterion={removeCriterion}
                  criterion={
                    criterionContainer.criterion as TextAreaCriterionType
                  }
                  editCriterion={editCriterion(criterionIndex)}
                />
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
            onClick={addCriterion('MultiSelectCriterion')}
            size="small"
            startIcon={<Icon>add_circle</Icon>}
          >
            Lisää kriteeri
          </Button>
          <Button
            onClick={addCriterion('TextAreaCriterion')}
            size="small"
            startIcon={<Icon>add_circle</Icon>}
          >
            Lisää tekstilaatikko
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default SectionEditor
