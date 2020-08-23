import React from 'react'
import { MultiSelectCriterionType } from './MultiSelectCriterion'
import { Button, Grid, Icon } from '@material-ui/core'
import { EditSectionType } from './App'
import SectionEditor from './SectionEditor'

interface CriterionContainerType {
  type: string
  criterion: MultiSelectCriterionType
}

export interface SectionType {
  title: string
  criterionContainers: CriterionContainerType[]
}

interface Props {
  rubric: SectionType[]
  addSection: () => void
  removeSection: (sectionIndex: number) => void
  editSection: EditSectionType
}

const RubricEditor = (props: Props): JSX.Element => (
  <Grid container spacing={4}>
    {props.rubric.map((section, sectionIndex: number) => {
      return (
        <Grid item xs={12} key={sectionIndex}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Button
                onClick={() => props.removeSection(sectionIndex)}
                color="secondary"
                startIcon={<Icon>remove_circle</Icon>}
              >
                Poista
              </Button>
            </Grid>
            <Grid item xs={10}>
              <SectionEditor
                section={section}
                editSection={props.editSection(sectionIndex)}
              />
            </Grid>
          </Grid>
        </Grid>
      )
    })}
    <Grid item xs={12}>
      <Button
        onClick={props.addSection}
        startIcon={<Icon>add_circle</Icon>}
      >
        Lisää osio
      </Button>
    </Grid>
  </Grid>
)

export default RubricEditor
