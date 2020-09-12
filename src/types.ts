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

export type InfoCriterionType = {
  title: string
}

export type CriterionType =
  | MultiSelectCriterionType
  | TextAreaCriterionType
  | InfoCriterionType

export interface CriterionContainerType {
  type: string
  criterion: CriterionType
}

export interface SectionType {
  title: string
  criterionContainers: CriterionContainerType[]
}

export type SelectionType = 'deselect' | 'select' | null

export type RubricType = {
  title: string
  sections: SectionType[]
  selection: SelectionType
}
