import React from 'react'
import MultiSelectCriterion, {
  MultiSelectCriterionType,
} from './MultiSelectCriterion'
import SectionTitle from './SectionTitle'
import { Button, Grid } from '@material-ui/core'

interface CriterionContainerType {
  type: string
  criterion: MultiSelectCriterionType
}

export interface SectionType {
  title: string
  criterionContainers: CriterionContainerType[]
}

interface Props {
  sections: SectionType[]
  addSection: () => void
  removeSection: (sectionIndex: number) => void
}

const SectionEditor = (props: Props): JSX.Element => {
  console.log(`sections: ${props.sections}`)
  return (
    <Grid container spacing={4}>
      {props.sections.map((section, sectionIndex: number) => {
        return (
          <Grid item xs={12} key={sectionIndex}>
            <Button
              onClick={() => props.removeSection(sectionIndex)}
              variant="outlined"
              color="secondary"
            >
              Poista osio
            </Button>
            <SectionTitle title={section.title} />
            {section.criterionContainers.map((criterionContainer) => {
              if (criterionContainer.type === 'MultiSelectCriterion') {
                return (
                  <MultiSelectCriterion
                    title={criterionContainer.criterion.title}
                    options={criterionContainer.criterion.options}
                  />
                )
              } else {
                console.error(
                  `unsupported criterion type '${criterionContainer.type}'`
                )
              }
            })}
            <Button variant="contained">Lisää kriteeri</Button>
          </Grid>
        )
      })}
      <Grid item xs={12}>
        <Button onClick={props.addSection} variant="contained">
          Lisää osio
        </Button>
      </Grid>
    </Grid>
  )
}

export default SectionEditor
