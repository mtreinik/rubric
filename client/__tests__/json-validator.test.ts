import Ajv from 'ajv'
import * as rubricSchema from '../src/rubricSchema.json'
const ajv = new Ajv()

describe('rubric json validator', () => {
  describe('is valid with', () => {
    it('one section and no criterions', () => {
      expect(
        ajv.validate(rubricSchema, [{ title: 'section title', criterions: [] }])
      ).toEqual(true)
    })
    it('one section and one multiselect criterion', () => {
      expect(
        ajv.validate(rubricSchema, [
          {
            title: 'section title',
            criterions: [
              {
                type: 'MultiSelectCriterion',
                criterion: { title: 'criterion title', options: ['a', 'b'] },
              },
            ],
          },
        ])
      ).toEqual(true)
    })
    it('one section and one textarea criterion', () => {
      expect(
        ajv.validate(rubricSchema, [
          {
            title: 'section title',
            criterions: [
              {
                type: 'TextAreaCriterion',
                criterion: { title: 'criterion title' },
              },
            ],
          },
        ])
      ).toEqual(true)
    })
    it('one section and one info criterion', () => {
      expect(
        ajv.validate(rubricSchema, [
          {
            title: 'section title',
            criterions: [
              {
                type: 'InfoCriterion',
                criterion: { title: 'criterion title' },
              },
            ],
          },
        ])
      ).toEqual(true)
    })
    it('one section and one slider criterion', () => {
      expect(
        ajv.validate(rubricSchema, [
          {
            title: 'section title',
            criterions: [
              {
                type: 'SliderCriterion',
                criterion: {
                  title: 'slider criterion',
                  options: ['5', '4', '3', '2', '1'],
                  rows: [{ title: 'slider title', value: 1 }],
                },
              },
            ],
          },
        ])
      ).toEqual(true)
    })
  })

  describe('is invalid with', () => {
    it('string', () => {
      expect(ajv.validate(rubricSchema, 'foobar')).toEqual(false)
    })
    it('object', () => {
      expect(ajv.validate(rubricSchema, {})).toEqual(false)
    })
    it('missing criterions', () => {
      expect(ajv.validate(rubricSchema, [{ title: 'foo' }])).toEqual(false)
    })
    it('missing section title', () => {
      expect(ajv.validate(rubricSchema, [{ criterions: [] }])).toEqual(false)
    })
    it('invalid criterion type', () => {
      expect(
        ajv.validate(rubricSchema, [
          {
            title: 'section title',
            criterions: [{ type: 'UnknownCriterion' }],
          },
        ])
      ).toEqual(false)
    })
    it('additional section property', () => {
      expect(
        ajv.validate(rubricSchema, [
          { title: 'foo', criterions: [], invalid: 'bar' },
        ])
      ).toEqual(false)
    })
    it('additional criterions property', () => {
      expect(
        ajv.validate(rubricSchema, [
          {
            title: 'section title',
            criterions: [],
            invalid: 'bar',
          },
        ])
      ).toEqual(false)
    })
    it('additional multiselect criterion property', () => {
      expect(
        ajv.validate(rubricSchema, [
          {
            title: 'section title',
            criterions: [
              {
                type: 'MultiSelectCriterion',
                criterion: {
                  title: 'criterion title',
                  options: ['a', 'b'],
                  invalid: 'bar',
                },
              },
            ],
          },
        ])
      ).toEqual(false)
    })
    it('additional slider property', () => {
      expect(
        ajv.validate(rubricSchema, [
          {
            title: 'section title',
            criterions: [
              {
                type: 'SliderCriterion',
                criterion: {
                  options: ['5', '4', '3', '2', '1'],
                  rows: [{ title: 'slider title', value: 1, foo: 2 }],
                },
              },
            ],
          },
        ])
      ).toEqual(false)
    })
    it('invalid slider value', () => {
      expect(
        ajv.validate(rubricSchema, [
          {
            title: 'section title',
            criterions: [
              {
                type: 'SliderCriterion',
                criterion: {
                  options: ['5', '4', '3', '2', '1'],
                  rows: [{ title: 'slider title', value: 'foo' }],
                },
              },
            ],
          },
        ])
      ).toEqual(false)
    })
    it('invalid multiselect criterion options', () => {
      expect(
        ajv.validate(rubricSchema, [
          {
            title: 'section title',
            criterions: [
              {
                type: 'MultiSelectCriterion',
                criterion: { title: 'criterion title', options: [1, 2] },
              },
            ],
          },
        ])
      ).toEqual(false)
    })
  })
})
