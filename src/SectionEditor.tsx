import React from 'react'
import { Button, Icon, IconButton, Grid, TextField } from '@material-ui/core'
import { SectionType } from './RubricEditor'
import MultiSelectCriterionEditor from './MultiSelectCriterionEditor'
interface Props {
  section: SectionType
  editSection: (section: SectionType) => void
}

const SectionEditor = (props: Props): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.editSection({ ...props.section, title: event.target.value })
  }

  const editCriterion = (criterionIndex: number) => (
    criterionTitle: string
  ): void => {
    const newSection = { ...props.section }
    const newCriterionContainer = {
      ...newSection.criterionContainers[criterionIndex],
    }
    newCriterionContainer.criterion.title = criterionTitle
    newSection.criterionContainers[criterionIndex] = newCriterionContainer
    props.editSection(newSection)
  }

  const addCriterion = (): void => {
    props.editSection({
      ...props.section,
      criterionContainers: [
        ...props.section.criterionContainers,
        {
          type: 'MultiSelectCriterion',
          criterion: { title: 'Uusi kriteeri', options: ['eka', 'toka'] },
        },
      ],
    })
  }

  const removeCriterion = (criterionIndex: number) => (): void => {
    const newCriterionContainers = props.section.criterionContainers.slice()
    newCriterionContainers.splice(criterionIndex, 1)
    props.editSection({
      ...props.section,
      criterionContainers: newCriterionContainers,
    })
  }

  const addOption = (criterionIndex: number) => (): void => {
    const newCriterionContainers = props.section.criterionContainers.slice()
    newCriterionContainers[criterionIndex].criterion.options.push(
      'uusi vaihtoehto'
    )
    props.editSection({
      ...props.section,
      criterionContainers: newCriterionContainers,
    })
  }

  const removeOption = (criterionIndex: number) => (
    optionIndex: number
  ): void => {
    const newCriterionContainers = props.section.criterionContainers.slice()
    newCriterionContainers[criterionIndex].criterion.options.splice(
      optionIndex,
      1
    )
    props.editSection({
      ...props.section,
      criterionContainers: newCriterionContainers,
    })
  }

  const editOption = (criterionIndex: number) => (optionIndex: number) => (
    optionTitle: string
  ): void => {
    const newCriterionContainers = props.section.criterionContainers.slice()
    newCriterionContainers[criterionIndex].criterion.options[
      optionIndex
    ] = optionTitle
    props.editSection({
      ...props.section,
      criterionContainers: newCriterionContainers,
    })
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid key="title" item xs={12}>
          <TextField value={props.section.title} onChange={handleChange} />
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
