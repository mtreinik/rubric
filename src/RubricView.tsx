import React from 'react'
import MultiSelectCriterion from './MultiSelectCriterion'
import SectionTitle from './SectionTitle'
import { Grid } from '@material-ui/core'
import { SectionType } from './RubricEditor'

interface Props {
  rubric: SectionType[]
}

const RubricView = (props: Props): JSX.Element => (
  <Grid container spacing={2}>
    {props.rubric.map((section, sectionIndex: number) => {
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
