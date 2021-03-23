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

export interface CriterionWithOptionsAndType {
  type: 'MultiSelectCriterion' | 'SliderCriterion'
  criterion: MultiSelectCriterionType | SliderCriterionType
}

export function isCriterionWithOptionsAndType(
  criterionAndType: CriterionAndType
): criterionAndType is CriterionWithOptionsAndType {
  return (
    criterionAndType.type === 'MultiSelectCriterion' ||
    criterionAndType.type === 'SliderCriterion'
  )
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

export type SelectionType = 'select' | 'deselect' | undefined

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
