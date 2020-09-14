import React from 'react'
import { Button, Grid, Icon } from '@material-ui/core'
import { EditSectionType, SectionType } from './types'
import SectionEditor from './SectionEditor'
import { TFunction } from 'i18next'

interface Props {
  sections: SectionType[]
  addSection: () => void
  removeSection: (sectionIndex: number) => void
  editSection: EditSectionType
  t: TFunction
  toggleRubricEditor: () => void
}

const RubricEditor = (props: Props): JSX.Element => {
  const t = props.t
  return (
    <Grid container spacing={4} style={{ backgroundColor: '#f0f0f0' }}>
      <Grid item xs={12} key="title">
        <Grid container alignContent="flex-end">
          <Grid item xs={10}>
            <h2>{t('editRubric')}</h2>
          </Grid>
          <Grid item xs={2}>
            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              onClick={props.toggleRubricEditor}
            >
              {t('close')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
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
                  {t('section')}
                </Button>
              </Grid>
              <Grid item xs={10}>
                <SectionEditor
                  section={section}
                  editSection={props.editSection(sectionIndex)}
                  t={t}
                />
              </Grid>
            </Grid>
          </Grid>
        )
      })}
      <Grid item xs={12}>
        <Button onClick={props.addSection} startIcon={<Icon>add_circle</Icon>}>
          {t('addSection')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default RubricEditor
