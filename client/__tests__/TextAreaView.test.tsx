import React from 'react'
import { mount, shallow } from 'enzyme'
import TextAreaView from '../src/TextAreaView'

describe('TextAreaView', () => {
  describe('renders correctly when', () => {
    const expectValidComponent = (
      title: string,
      value: string,
      selection = ''
    ): void => {
      const component = shallow(
        <TextAreaView title={title} value={value} selection={selection} />
      )
      expect(component).toMatchSnapshot()
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
      it('editing the value', () => {
        const component = mount(<TextAreaView title="title" selection="" />)
        expect(component.find('textarea').props().value).toEqual('')
        component
          .find('textarea')
          .simulate('change', { target: { value: 'foo\n\nbar' } })
        expect(component.find('textarea').props().value).toEqual('foo\n\nbar')
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
  describe('behaves correctly when', () => {
    it('editing the value and turning selection on/off', () => {
      const component = mount(<TextAreaView title="title" selection="" />)
      expect(component.find('textarea').props().value).toEqual('')
      expect(component.find('span')).toEqual({})

      component
        .find('textarea')
        .simulate('change', { target: { value: 'foo<b>bar</b>' } })
      expect(component.find('textarea').props().value).toEqual('foo<b>bar</b>')
      expect(component.find('span')).toEqual({})

      component
        .find('textarea')
        .simulate('change', { target: { value: 'foo\n\nbar' } })
      expect(component.find('textarea').props().value).toEqual('foo\n\nbar')
      expect(component.find('span')).toEqual({})

      component.setProps({ selection: 'select' })
      expect(component.find('textarea')).toEqual({})
      expect(component.find('span').html()).toEqual(
        '<span>foo<br><br>bar</span>'
      )

      component.setProps({ selection: '' })
      expect(component.find('textarea').props().value).toEqual('foo\n\nbar')
      expect(component.find('span')).toEqual({})
    })
  })
})
