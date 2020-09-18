import React from 'react'
import { Button, Grid, Icon, IconButton, Typography } from '@material-ui/core'
import { AppState, EditSectionType, SectionType } from './types'
import SectionEditor from './SectionEditor'
import { TFunction } from 'i18next'
import { swapElements } from './array-utils'
import * as O from 'optics-ts'

const criterionsLens = O.optic<SectionType>().prop('criterions')

interface Props {
  appState: AppState
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
    const section = props.appState.sections[sectionIndex]
    const newCriterions = swapElements(criterionIndex, section.criterions)
    props.editSection(sectionIndex)(
      O.set(criterionsLens)(newCriterions)(section)
    )
  }

  return (
    <Grid
      container
      spacing={4}
      style={{
        backgroundColor: props.appState.showRubricEditor
          ? '#f0f0f0'
          : '#ffffff',
        transitionDuration: '0.5s',
        transitionProperty: 'background-color',
      }}
    >
      <Grid item xs={12} key="title">
        <Grid container justify="flex-end">
          <Grid item>
            <IconButton onClick={props.toggleRubricEditor}>
              {props.appState.showRubricEditor ? (
                <Icon>close</Icon>
              ) : (
                <Icon>edit</Icon>
              )}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {props.appState.showRubricEditor &&
        props.appState.sections.map(
          (section: SectionType, sectionIndex: number) => {
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
                          disabled={
                            sectionIndex >= props.appState.sections.length - 1
                          }
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
          }
        )}
      {props.appState.showRubricEditor && (
        <Grid item xs={12}>
          <Button
            onClick={props.addSection}
            startIcon={<Icon>add_circle</Icon>}
          >
            {t('addSection')}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default RubricEditor
