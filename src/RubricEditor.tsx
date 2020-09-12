import React from 'react'
import { Button, Grid, Icon } from '@material-ui/core'
import { EditSectionType, SectionType } from './types'
import SectionEditor from './SectionEditor'

interface Props {
  sections: SectionType[]
  addSection: () => void
  removeSection: (sectionIndex: number) => void
  editSection: EditSectionType
}

const RubricEditor = (props: Props): JSX.Element => {
  return (
    <Grid container spacing={4}>
      {props.sections.map((section, sectionIndex: number) => {
        return (
          <Grid item xs={12} key={sectionIndex}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Button
                  onClick={() => props.removeSection(sectionIndex)}
                  color="secondary"
                  startIcon={<Icon>remove_circle</Icon>}
                >
                  osio
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
        <Button onClick={props.addSection} startIcon={<Icon>add_circle</Icon>}>
          Lisää osio
        </Button>
      </Grid>
    </Grid>
  )
}

export default RubricEditor
