export type EditTitleType = (title: string) => void

export type EditSectionType = (
  sectionIndex: number
) => (section: SectionType) => void

export interface MultiSelectCriterionType {
  title: string
  options: string[]
}

export interface CriterionContainerType {
  type: string
  criterion: MultiSelectCriterionType
}

export interface SectionType {
  title: string
  criterionContainers: CriterionContainerType[]
}

export type RubricType = {
  title: string
  sections: SectionType[]
}
