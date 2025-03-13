import React from 'react'
import MultiSelectCriterionView from './MultiSelectCriterionView'
import TextAreaView from './TextAreaView'

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
import { TFunction } from 'i18next'

interface Props {
  sections: SectionType[]
  selection: SelectionType
  version: number
  setSliderRowValue: (
    sectionIndex: number,
    criterionIndex: number
  ) => (rowIndex: number, value: number) => void
  t: TFunction
}

const RubricView = (props: Props): JSX.Element => (
  <Grid container>
    <Grid item xs={12} key="rubricHeader">
      <hr />
    </Grid>
    {props.sections.map((section, sectionIndex: number) => {
      return (
        <Grid item xs={12} key={sectionIndex}>
          <div className="sectionTitle">
            <br />
            {section.title}
          </div>
          {section.criterions.map((criterionAndType, criterionIndex) => {
            const type = criterionAndType.type
            const criterion = criterionAndType.criterion
            switch (type) {
              case 'MultiSelectCriterion': {
                const multiSelectCriterion =
                  criterion as MultiSelectCriterionType
                return (
                  <MultiSelectCriterionView
                    key={'criterion-' + props.version + '-' + criterionIndex}
                    title={multiSelectCriterion.title}
                    options={multiSelectCriterion.options}
                    selection={props.selection}
                    t={props.t}
                  />
                )
              }
              case 'TextAreaCriterion': {
                const textAreaCriterion = criterion as TextAreaCriterionType
                return (
                  <TextAreaView
                    key={'criterion-' + props.version + '-' + criterionIndex}
                    title={textAreaCriterion.title}
                    selection={props.selection}
                  />
                )
              }
              case 'InfoCriterion': {
                const infoCriterion = criterion as InfoCriterionType
                return (
                  <InfoView
                    key={'criterion-' + criterionIndex}
                    title={infoCriterion.title}
                  />
                )
              }
              case 'SliderCriterion': {
                const sliderCriterion = criterion as SliderCriterionType
                return (
                  <SliderView
                    key={'slider-' + criterionIndex}
                    title={sliderCriterion.title}
                    options={sliderCriterion.options}
                    rows={sliderCriterion.rows}
                    setSliderRowValue={props.setSliderRowValue(
                      sectionIndex,
                      criterionIndex
                    )}
                    selection={props.selection}
                    t={props.t}
                  />
                )
              }
              default:
                console.error(`unsupported criterion type '${type}'`)
            }
          })}
        </Grid>
      )
    })}
  </Grid>
)

export default RubricView
