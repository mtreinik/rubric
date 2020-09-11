import React from 'react'
import MultiSelectCriterionView from './MultiSelectCriterionView'
import TextAreaView from './TextAreaView'

import SectionTitle from './SectionTitle'
import { Grid } from '@material-ui/core'
import {
  RubricType,
  MultiSelectCriterionType,
  TextAreaCriterionType,
} from './types'
import RubricTitle from './RubricTitle'

interface Props {
  rubric: RubricType
}

const RubricView = (props: Props): JSX.Element => (
  <Grid container spacing={2}>
    <Grid item xs={12} key="rubricHeader">
      <hr />
    </Grid>
    <Grid item xs={12} key="rubricTitle">
      <RubricTitle title={props.rubric.title} />
    </Grid>
    {props.rubric.sections.map((section, sectionIndex: number) => {
      return (
        <Grid item xs={12} key={sectionIndex}>
          <SectionTitle title={section.title} />
          {section.criterionContainers.map(
            (criterionContainer, criterionIndex) => {
              if (criterionContainer.type === 'MultiSelectCriterion') {
                const multiSelectCriterion = criterionContainer.criterion as MultiSelectCriterionType
                return (
                  <MultiSelectCriterionView
                    key={'criterion-' + criterionIndex}
                    title={multiSelectCriterion.title}
                    options={multiSelectCriterion.options}
                  />
                )
              } else if (criterionContainer.type === 'TextAreaCriterion') {
                const textAreaCriterion = criterionContainer.criterion as TextAreaCriterionType
                return (
                  <TextAreaView
                    key={'criterion-' + criterionIndex}
                    title={textAreaCriterion.title}
                    selected={props.rubric.selected}
                  />
                )
              } else {
                console.error(
                  `unsupported criterion type '${criterionContainer.type}'`
                )
              }
            }
          )}
        </Grid>
      )
    })}
  </Grid>
)

export default RubricView
