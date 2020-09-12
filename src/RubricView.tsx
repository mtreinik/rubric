import React from 'react'
import MultiSelectCriterionView from './MultiSelectCriterionView'
import TextAreaView from './TextAreaView'

import SectionTitle from './SectionTitle'
import { Grid } from '@material-ui/core'
import {
  RubricType,
  MultiSelectCriterionType,
  TextAreaCriterionType,
  InfoCriterionType,
} from './types'
import RubricTitle from './RubricTitle'
import InfoView from './InfoView'

interface Props {
  rubric: RubricType
}

const RubricView = (props: Props): JSX.Element => (
  <Grid container>
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
              const type = criterionContainer.type
              const criterion = criterionContainer.criterion
              if (type === 'MultiSelectCriterion') {
                const multiSelectCriterion = criterion as MultiSelectCriterionType
                return (
                  <MultiSelectCriterionView
                    key={'criterion-' + criterionIndex}
                    title={multiSelectCriterion.title}
                    options={multiSelectCriterion.options}
                  />
                )
              } else if (type === 'TextAreaCriterion') {
                const textAreaCriterion = criterion as TextAreaCriterionType
                return (
                  <TextAreaView
                    key={'criterion-' + criterionIndex}
                    title={textAreaCriterion.title}
                    selection={props.rubric.selection}
                  />
                )
              } else if (type === `InfoCriterion`) {
                const infoCriterion = criterion as InfoCriterionType
                return (
                  <InfoView
                    key={'criterion-' + criterionIndex}
                    title={infoCriterion.title}
                  />
                )
              } else {
                console.error(`unsupported criterion type '${type}'`)
              }
            }
          )}
        </Grid>
      )
    })}
  </Grid>
)

export default RubricView
