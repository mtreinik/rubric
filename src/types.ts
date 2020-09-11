export type EditTitleType = (title: string) => void

export type EditSectionType = (
  sectionIndex: number
) => (section: SectionType) => void

export type MultiSelectCriterionType = {
  title: string
  options: string[]
}

export type TextAreaCriterionType = {
  title: string
  value: string
}

export type CriterionType = MultiSelectCriterionType | TextAreaCriterionType

export interface CriterionContainerType {
  type: string
  criterion: CriterionType
}

export interface SectionType {
  title: string
  criterionContainers: CriterionContainerType[]
}

export type RubricType = {
  title: string
  sections: SectionType[]
}
