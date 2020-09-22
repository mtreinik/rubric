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

export type SliderRowType = {
  title: string
  value: number
}

export type SliderCriterionType = {
  title: string
  options: string[]
  rows: SliderRowType[]
}

export type CriterionType =
  | MultiSelectCriterionType
  | TextAreaCriterionType
  | InfoCriterionType
  | SliderCriterionType

export interface CriterionAndType {
  type: string
  criterion: CriterionType
}

export interface MultiSelectCriterionAndType {
  type: 'MultiSelectCriterion'
  criterion: MultiSelectCriterionType
}

export function isMultiSelectCriterionAndType(
  criterionAndType: CriterionAndType
): criterionAndType is MultiSelectCriterionAndType {
  return criterionAndType.type === 'MultiSelectCriterion'
}

export interface SliderCriterionAndType {
  type: 'SliderCriterion'
  criterion: SliderCriterionType
}

export function isSliderCriterionAndType(
  criterionAndType: CriterionAndType
): criterionAndType is SliderCriterionAndType {
  return criterionAndType.type === 'SliderCriterion'
}

export interface SectionType {
  title: string
  criterions: CriterionAndType[]
}

export type SelectionType = string

export type AppState = {
  sections: SectionType[]
  selection: SelectionType
  language: string
  showRubricEditor: boolean
  version: number
  dirty: boolean
}

export type LanguageCode = 'fi' | 'en'
export type Language = {
  code: LanguageCode
  name: string
}
