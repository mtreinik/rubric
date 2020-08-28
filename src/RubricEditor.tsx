import React from 'react'
import { Button, Grid, Icon, TextField } from '@material-ui/core'
import { EditTitleType, EditSectionType, RubricType } from './types'
import SectionEditor from './SectionEditor'

interface Props {
  rubric: RubricType
  editTitle: EditTitleType
  addSection: () => void
  removeSection: (sectionIndex: number) => void
  editSection: EditSectionType
}

const RubricEditor = (props: Props): JSX.Element => {
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.editTitle(event.target.value)
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} key="rubricTitle">
        <TextField
          value={props.rubric.title}
          onChange={handleTitleChange}
        ></TextField>
      </Grid>
      {props.rubric.sections.map((section, sectionIndex: number) => {
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
        <Button onClick={props.addSection} startIcon={<Icon>add_circle</Icon>}>
          Lisää osio
        </Button>
      </Grid>
    </Grid>
  )
}

export default RubricEditor
