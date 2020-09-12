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
}

export type InfoCriterionType = {
  title: string
}

export type CriterionType =
  | MultiSelectCriterionType
  | TextAreaCriterionType
  | InfoCriterionType

export interface CriterionAndType {
  type: string
  criterion: CriterionType
}

export interface MultiSelectCriterionAndType {
  type: string
  criterion: MultiSelectCriterionType
}

export interface SectionType {
  title: string
  criterions: CriterionAndType[]
}

export interface MultiSelectCriterionSectionType {
  title: string
  criterions: MultiSelectCriterionAndType[]
}

export type SelectionType = 'deselect' | 'select' | null

export type AppState = {
  sections: SectionType[]
  selection: SelectionType
}
