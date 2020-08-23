import React from 'react'
import { MultiSelectCriterionType } from './MultiSelectCriterion'
import { Button, Grid } from '@material-ui/core'
import { EditSectionType } from './App'
import SectionEditor from './SectionEditor'

interface CriterionContainerType {
  type: 'MultiSelectCriterion'
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
                variant="outlined"
                color="secondary"
              >
                Poista osio
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
      <Button onClick={props.addSection} variant="contained">
        Lisää osio
      </Button>
    </Grid>
  </Grid>
)

export default RubricEditor
