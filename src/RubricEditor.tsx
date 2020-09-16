import React from 'react'
import { Button, Grid, Icon, IconButton, Typography } from '@material-ui/core'
import { EditSectionType, SectionType } from './types'
import SectionEditor from './SectionEditor'
import { TFunction } from 'i18next'
import { swapElements } from './array-utils'
import * as O from 'optics-ts'

const criterionsLens = O.optic<SectionType>().prop('criterions')

interface Props {
  sections: SectionType[]
  addSection: () => void
  removeSection: (sectionIndex: number) => void
  moveSectionUp: (sectionIndex: number) => void
  moveSectionDown: (sectionIndex: number) => void
  editSection: EditSectionType
  t: TFunction
  toggleRubricEditor: () => void
}

const RubricEditor = (props: Props): JSX.Element => {
  const t = props.t

  const moveCriterionUp = (sectionIndex: number) => (
    criterionIndex: number
  ): void => moveCriterionDown(sectionIndex)(criterionIndex - 1)

  const moveCriterionDown = (sectionIndex: number) => (
    criterionIndex: number
  ): void => {
    console.log('sectionIndex', sectionIndex, 'criterionIndex', criterionIndex)
    const section = props.sections[sectionIndex]
    const newCriterions = swapElements(criterionIndex, section.criterions)
    props.editSection(sectionIndex)(
      O.set(criterionsLens)(newCriterions)(section)
    )
  }

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
                <Typography variant="button">{t('section')}</Typography>
                <Grid container spacing={1}>
                  <Grid item>
                    <IconButton
                      onClick={() => props.moveSectionUp(sectionIndex)}
                      disabled={sectionIndex <= 0}
                      size="small"
                    >
                      <Icon>arrow_upward</Icon>
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => props.moveSectionDown(sectionIndex)}
                      disabled={sectionIndex >= props.sections.length - 1}
                      size="small"
                    >
                      <Icon>arrow_downward</Icon>
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => props.removeSection(sectionIndex)}
                      color="secondary"
                      size="small"
                    >
                      <Icon>remove_circle</Icon>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <SectionEditor
                  section={section}
                  editSection={props.editSection(sectionIndex)}
                  moveCriterionUp={moveCriterionUp(sectionIndex)}
                  moveCriterionDown={moveCriterionDown(sectionIndex)}
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
