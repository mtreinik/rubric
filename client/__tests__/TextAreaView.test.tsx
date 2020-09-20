import React from 'react'
import renderer from 'react-test-renderer'
import TextAreaView from '../src/TextAreaView'
import DOMPurify from 'dompurify'

describe('TextAreaView renders correctly with', () => {
  const expectValidComponent = (
    title: string,
    value: string,
    selection = ''
  ): void => {
    const component = renderer.create(
      <TextAreaView title={title} value={value} selection={selection} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  }

  describe('no selection and', () => {
    it('empty title and empty value', () => {
      expectValidComponent('', '')
    })
    it('text title and empty value', () => {
      expectValidComponent('xyzzy', '')
    })
    it('text title and text value', () => {
      expectValidComponent('foo', 'bar')
    })
    it('text title and value with newlines', () => {
      expectValidComponent('foo', 'bar\n\nbaz')
    })
    it('text title and value with XSS attack', () => {
      expectValidComponent(
        'title',
        '<span onmouseover="alert(document.cookie)">this is an\nXSS attack</span>'
      )
    })
  })

  describe('selection and', () => {
    it('empty title and empty value', () => {
      expectValidComponent('', '', 'select')
    })
    it('text title and empty value', () => {
      expectValidComponent('xyzzy', '', 'select')
    })
    it('text title and text value', () => {
      expectValidComponent('foo', 'bar', 'select')
    })
    it('text title and value with newlines', () => {
      expectValidComponent('foo', 'bar\n\nbaz', 'select')
    })
    it('text title and value with XSS attack', () => {
      expectValidComponent(
        'title',
        '<span onmouseover="alert(document.cookie)">this is an\nXSS attack</span>',
        'select'
      )
    })
  })
})
