import React from 'react'
import MultiSelectCriterionView from './MultiSelectCriterionView'
import TextAreaView from './TextAreaView'

import SectionTitle from './SectionTitle'
import { Grid } from '@material-ui/core'
import {
  MultiSelectCriterionType,
  TextAreaCriterionType,
  InfoCriterionType,
  SelectionType,
  SectionType,
  SliderCriterionType,
} from './types'
import InfoView from './InfoView'
import SliderView from './SliderView'

interface Props {
  sections: SectionType[]
  selection: SelectionType
  version: number
}

const RubricView = (props: Props): JSX.Element => (
  <Grid container>
    <Grid item xs={12} key="rubricHeader">
      <hr />
    </Grid>
    {props.sections.map((section, sectionIndex: number) => {
      return (
        <Grid item xs={12} key={sectionIndex}>
          <SectionTitle title={section.title} />
          {section.criterions.map((criterionAndType, criterionIndex) => {
            const type = criterionAndType.type
            const criterion = criterionAndType.criterion
            if (type === 'MultiSelectCriterion') {
              const multiSelectCriterion = criterion as MultiSelectCriterionType
              return (
                <MultiSelectCriterionView
                  key={'criterion-' + props.version + '-' + criterionIndex}
                  title={multiSelectCriterion.title}
                  options={multiSelectCriterion.options}
                />
              )
            } else if (type === 'TextAreaCriterion') {
              const textAreaCriterion = criterion as TextAreaCriterionType
              return (
                <TextAreaView
                  key={'criterion-' + props.version + '-' + criterionIndex}
                  title={textAreaCriterion.title}
                  selection={props.selection}
                />
              )
            } else if (type === 'InfoCriterion') {
              const infoCriterion = criterion as InfoCriterionType
              return (
                <InfoView
                  key={'criterion-' + criterionIndex}
                  title={infoCriterion.title}
                />
              )
            } else if (type === 'SliderCriterion') {
              const sliderCriterion = criterion as SliderCriterionType
              return (
                <SliderView
                  key={'slider-' + criterionIndex}
                  title={sliderCriterion.title}
                  options={sliderCriterion.options}
                  rows={sliderCriterion.rows}
                />
              )
            } else {
              console.error(`unsupported criterion type '${type}'`)
            }
          })}
        </Grid>
      )
    })}
  </Grid>
)

export default RubricView
