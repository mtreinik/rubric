import React from 'react'
import MultiSelectCriterion from './MultiSelectCriterion'
import SectionTitle from './SectionTitle'
import { Grid } from '@material-ui/core'
import { RubricType } from './types'
import RubricTitle from './RubricTitle'

interface Props {
  rubric: RubricType
}

const RubricView = (props: Props): JSX.Element => (
  <Grid container spacing={2}>
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
                return (
                  <MultiSelectCriterion
                    key={'criterion-' + criterionIndex}
                    title={criterionContainer.criterion.title}
                    options={criterionContainer.criterion.options}
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
